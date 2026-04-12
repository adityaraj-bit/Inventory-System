module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/authGuard.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requireAuth",
    ()=>requireAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
async function requireAuth(role) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        throw new Error("Unauthorized");
    }
    const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret);
    const user = payload;
    if (role && user.role !== role) {
        throw new Error("Forbidden");
    }
    return user;
}
}),
"[project]/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/services/analyticsService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDashboardStats",
    ()=>getDashboardStats,
    "getDeadStock",
    ()=>getDeadStock,
    "getProductAnalytics",
    ()=>getProductAnalytics,
    "getProfitabilityTrend",
    ()=>getProfitabilityTrend,
    "getSalesAnalytics",
    ()=>getSalesAnalytics,
    "getStockMovementTrend",
    ()=>getStockMovementTrend,
    "getSupplierAnalytics",
    ()=>getSupplierAnalytics,
    "getTopSellingProducts",
    ()=>getTopSellingProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
;
async function getDashboardStats() {
    const [productsCount, salesCount, purchaseCount, stockStats, revenue, purchaseCost, products] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.count({
            where: {
                isActive: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.count({
            where: {
                type: "SALE",
                status: "COMPLETED"
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.count({
            where: {
                type: "PURCHASE",
                status: "COMPLETED"
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.aggregate({
            _sum: {
                stock: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.aggregate({
            where: {
                type: "SALE",
                status: "COMPLETED"
            },
            _sum: {
                totalAmount: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.aggregate({
            where: {
                type: "PURCHASE",
                status: "COMPLETED"
            },
            _sum: {
                totalAmount: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
            where: {
                isActive: true
            },
            select: {
                stock: true,
                price: true
            }
        })
    ]);
    const inventoryValue = products.reduce((acc, p)=>acc + p.stock * p.price, 0);
    const lowStockCount = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.count({
        where: {
            stock: {
                lt: 100
            },
            isActive: true
        }
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
async function getSalesAnalytics() {
    const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findMany({
        where: {
            type: "SALE",
            status: "COMPLETED"
        },
        include: {
            customer: true
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    let totalRevenue = 0;
    const revenueByCustomer = {};
    const revenueTrend = {};
    orders.forEach((order)=>{
        const amount = order.totalAmount || 0;
        totalRevenue += amount;
        const customer = order.customer?.name || "Unknown";
        revenueByCustomer[customer] = (revenueByCustomer[customer] || 0) + amount;
        const date = order.createdAt.toISOString().slice(0, 10);
        if (!revenueTrend[date]) {
            revenueTrend[date] = {
                revenue: 0,
                orders: 0
            };
        }
        revenueTrend[date].revenue += amount;
        revenueTrend[date].orders += 1;
    });
    const trendArray = Object.entries(revenueTrend).map(([date, stats])=>({
            date,
            ...stats
        }));
    const topCustomers = Object.entries(revenueByCustomer).map(([name, totalSpend])=>({
            name,
            totalSpend
        })).sort((a, b)=>b.totalSpend - a.totalSpend).slice(0, 5);
    return {
        totalRevenue,
        averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        topCustomers,
        revenueTrend: trendArray
    };
}
async function getProductAnalytics() {
    const [topSelling, lowStock, totalProducts, categories] = await Promise.all([
        getTopSellingProducts(),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
            where: {
                stock: {
                    lt: 100
                },
                isActive: true
            },
            include: {
                category: true
            },
            take: 5
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.count({
            where: {
                isActive: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].category.findMany({
            include: {
                products: {
                    where: {
                        isActive: true
                    },
                    select: {
                        stock: true,
                        price: true
                    }
                }
            }
        })
    ]);
    const categoryDistribution = categories.map((cat)=>({
            name: cat.name,
            stockCount: cat.products.reduce((acc, p)=>acc + p.stock, 0),
            value: cat.products.reduce((acc, p)=>acc + p.stock * p.price, 0)
        })).filter((c)=>c.stockCount > 0);
    return {
        topSellingProducts: topSelling,
        lowStockProducts: lowStock,
        totalActiveProducts: totalProducts,
        categoryDistribution
    };
}
async function getTopSellingProducts() {
    const grouped = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].orderItem.groupBy({
        where: {
            order: {
                type: "SALE",
                status: "COMPLETED"
            }
        },
        by: [
            "productId"
        ],
        _sum: {
            quantity: true
        },
        orderBy: {
            _sum: {
                quantity: "desc"
            }
        },
        take: 10
    });
    const productIds = grouped.map((g)=>g.productId);
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    });
    return grouped.map((g)=>{
        const product = products.find((p)=>p.id === g.productId);
        return {
            id: g.productId,
            name: product?.name || "Unknown",
            sales: g._sum.quantity || 0,
            price: product?.price || 0
        };
    });
}
async function getProfitabilityTrend() {
    const [sales, purchases] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findMany({
            where: {
                type: "SALE",
                status: "COMPLETED"
            },
            select: {
                createdAt: true,
                totalAmount: true
            },
            orderBy: {
                createdAt: "asc"
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findMany({
            where: {
                type: "PURCHASE",
                status: "COMPLETED"
            },
            select: {
                createdAt: true,
                totalAmount: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })
    ]);
    const trend = {};
    sales.forEach((s)=>{
        const date = s.createdAt.toISOString().slice(0, 10);
        if (!trend[date]) trend[date] = {
            revenue: 0,
            cost: 0
        };
        trend[date].revenue += s.totalAmount || 0;
    });
    purchases.forEach((p)=>{
        const date = p.createdAt.toISOString().slice(0, 10);
        if (!trend[date]) trend[date] = {
            revenue: 0,
            cost: 0
        };
        trend[date].cost += p.totalAmount || 0;
    });
    return Object.entries(trend).map(([date, stats])=>({
            date,
            revenue: stats.revenue,
            cost: stats.cost,
            profit: stats.revenue - stats.cost
        })).sort((a, b)=>a.date.localeCompare(b.date));
}
async function getSupplierAnalytics() {
    const grouped = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.groupBy({
        where: {
            type: "PURCHASE",
            status: "COMPLETED"
        },
        by: [
            "supplierId"
        ],
        _count: {
            id: true
        },
        _sum: {
            totalAmount: true
        }
    });
    const supplierIds = grouped.map((g)=>g.supplierId).filter(Boolean);
    const suppliers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].supplier.findMany({
        where: {
            id: {
                in: supplierIds
            }
        }
    });
    return {
        supplierPerformance: grouped.map((g)=>{
            const supplier = suppliers.find((s)=>s.id === g.supplierId);
            return {
                id: g.supplierId,
                name: supplier?.name || "Unknown",
                orders: g._count.id,
                totalSpent: g._sum.totalAmount || 0
            };
        }).sort((a, b)=>b.totalSpent - a.totalSpent)
    };
}
async function getStockMovementTrend() {
    const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findMany({
        where: {
            status: "COMPLETED"
        },
        include: {
            items: true
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    const trend = {};
    orders.forEach((order)=>{
        const date = order.createdAt.toISOString().slice(0, 10);
        const orderQty = order.items.reduce((sum, item)=>sum + item.quantity, 0);
        const quantity = order.type === "PURCHASE" ? orderQty : -orderQty;
        trend[date] = (trend[date] || 0) + quantity;
    });
    return Object.entries(trend).map(([date, qty])=>({
            date,
            quantity: qty
        }));
}
async function getDeadStock() {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
        where: {
            orderItems: {
                none: {
                    order: {
                        type: "SALE",
                        createdAt: {
                            gte: ninetyDaysAgo
                        }
                    }
                }
            }
        }
    });
}
}),
"[project]/app/api/analytics/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authGuard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authGuard.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$analyticsService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/analyticsService.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authGuard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])();
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$analyticsService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProductAnalytics"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        data
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__860257bb._.js.map