import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    productsCount,
    salesCount,
    purchaseCount,
    stockStats,
    revenue,
    purchaseCost,
    products
  ] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count({ where: { type: "SALE", status: "COMPLETED" } }),
    prisma.order.count({ where: { type: "PURCHASE", status: "COMPLETED" } }),
    prisma.product.aggregate({
      _sum: { stock: true }
    }),
    prisma.order.aggregate({
      where: { type: "SALE", status: "COMPLETED" },
      _sum: { totalAmount: true }
    }),
    prisma.order.aggregate({
      where: { type: "PURCHASE", status: "COMPLETED" },
      _sum: { totalAmount: true }
    }),
    prisma.product.findMany({
      where: { isActive: true },
      select: { stock: true, price: true }
    })
  ]);

  const inventoryValue = products.reduce((acc, p) => acc + (p.stock * p.price), 0);
  const lowStockCount = await prisma.product.count({
    where: { stock: { lt: 100 }, isActive: true }
  });

  const totalRevenue = revenue._sum.totalAmount || 0;
  const totalCost = purchaseCost._sum.totalAmount || 0;

  return {
    totalProducts: productsCount,
    totalSalesOrders: salesCount,
    totalPurchaseOrders: purchaseCount,
    inventoryUnits: stockStats._sum.stock || 0,
    inventoryValue,
    revenue: totalRevenue,
    cost: totalCost,
    profit: totalRevenue - totalCost,
    lowStockCount
  };
}

export async function getSalesAnalytics() {
  const orders = await prisma.order.findMany({
    where: { type: "SALE", status: "COMPLETED" },
    include: {
      customer: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  let totalRevenue = 0;
  const revenueByCustomer: Record<string, number> = {};
  const revenueTrend: Record<string, { revenue: number; orders: number }> = {};

  orders.forEach(order => {
    const amount = order.totalAmount || 0;
    totalRevenue += amount;

    const customer = order.customer?.name || "Unknown";
    revenueByCustomer[customer] = (revenueByCustomer[customer] || 0) + amount;

    const date = order.createdAt.toISOString().slice(0, 10);
    if (!revenueTrend[date]) {
      revenueTrend[date] = { revenue: 0, orders: 0 };
    }
    revenueTrend[date].revenue += amount;
    revenueTrend[date].orders += 1;
  });

  const trendArray = Object.entries(revenueTrend).map(
    ([date, stats]) => ({ date, ...stats })
  );

  const topCustomers = Object.entries(revenueByCustomer)
    .map(([name, totalSpend]) => ({ name, totalSpend }))
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 5);

  return {
    totalRevenue,
    averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    topCustomers,
    revenueTrend: trendArray
  };
}

export async function getProductAnalytics() {
  const [topSelling, lowStock, totalProducts, categories] = await Promise.all([
    getTopSellingProducts(),
    prisma.product.findMany({
      where: { stock: { lt: 100 }, isActive: true },
      include: { category: true },
      take: 5
    }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.category.findMany({
      include: {
        products: {
          where: { isActive: true },
          select: { stock: true, price: true }
        }
      }
    })
  ]);

  const categoryDistribution = categories.map(cat => ({
    name: cat.name,
    stockCount: cat.products.reduce((acc, p) => acc + p.stock, 0),
    value: cat.products.reduce((acc, p) => acc + (p.stock * p.price), 0)
  })).filter(c => c.stockCount > 0);

  return {
    topSellingProducts: topSelling,
    lowStockProducts: lowStock,
    totalActiveProducts: totalProducts,
    categoryDistribution
  };
}

export async function getTopSellingProducts() {
  const grouped = await prisma.orderItem.groupBy({
    where: { order: { type: "SALE", status: "COMPLETED" } },
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: {
      _sum: { quantity: "desc" }
    },
    take: 10
  });

  const productIds = grouped.map(g => g.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  return grouped.map(g => {
    const product = products.find(p => p.id === g.productId);
    return {
      id: g.productId,
      name: product?.name || "Unknown",
      sales: g._sum.quantity || 0,
      price: product?.price || 0
    };
  });
}

export async function getProfitabilityTrend() {
  const [sales, purchases] = await Promise.all([
    prisma.order.findMany({
      where: { type: "SALE", status: "COMPLETED" },
      select: { createdAt: true, totalAmount: true },
      orderBy: { createdAt: "asc" }
    }),
    prisma.order.findMany({
      where: { type: "PURCHASE", status: "COMPLETED" },
      select: { createdAt: true, totalAmount: true },
      orderBy: { createdAt: "asc" }
    })
  ]);

  const trend: Record<string, { revenue: number; cost: number }> = {};

  sales.forEach(s => {
    const date = s.createdAt.toISOString().slice(0, 10);
    if (!trend[date]) trend[date] = { revenue: 0, cost: 0 };
    trend[date].revenue += (s.totalAmount || 0);
  });

  purchases.forEach(p => {
    const date = p.createdAt.toISOString().slice(0, 10);
    if (!trend[date]) trend[date] = { revenue: 0, cost: 0 };
    trend[date].cost += (p.totalAmount || 0);
  });

  return Object.entries(trend).map(([date, stats]) => ({
    date,
    revenue: stats.revenue,
    cost: stats.cost,
    profit: stats.revenue - stats.cost
  })).sort((a,b) => a.date.localeCompare(b.date));
}

export async function getSupplierAnalytics() {
  const grouped = await prisma.order.groupBy({
    where: { type: "PURCHASE", status: "COMPLETED" },
    by: ["supplierId"],
    _count: { id: true },
    _sum: { totalAmount: true }
  });

  const supplierIds = grouped.map(g => g.supplierId).filter(Boolean) as string[];

  const suppliers = await prisma.supplier.findMany({
    where: { id: { in: supplierIds } }
  });

  return {
    supplierPerformance: grouped.map(g => {
      const supplier = suppliers.find(s => s.id === g.supplierId);
      return {
        id: g.supplierId,
        name: supplier?.name || "Unknown",
        orders: g._count.id,
        totalSpent: g._sum.totalAmount || 0
      };
    }).sort((a, b) => b.totalSpent - a.totalSpent)
  };
}

export async function getStockMovementTrend() {
  const orders = await prisma.order.findMany({
    where: { status: "COMPLETED" },
    include: { items: true },
    orderBy: { createdAt: "asc" }
  });

  const trend: Record<string, number> = {};

  orders.forEach(order => {
    const date = order.createdAt.toISOString().slice(0, 10);
    const orderQty = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const quantity = order.type === "PURCHASE" ? orderQty : -orderQty;
    
    trend[date] = (trend[date] || 0) + quantity;
  });

  return Object.entries(trend).map(([date, qty]) => ({
    date,
    quantity: qty
  }));
}

export async function getDeadStock() {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  return prisma.product.findMany({
    where: {
      orderItems: {
        none: {
          order: {
            type: "SALE",
            createdAt: { gte: ninetyDaysAgo }
          }
        }
      }
    }
  });
}