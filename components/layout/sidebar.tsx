"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Boxes,
  Warehouse,
  ShoppingCart,
  Users,
  BarChart,
  Building,
  Database,
} from "lucide-react";

export default function Sidebar() {

  const { role } = useAuth();

  const commonLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Boxes },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Customers", href: "/customers", icon: Users },
  ];

  const managerLinks: any[] = [];

  const adminLinks = [
    { name: "Users", href: "/users", icon: Users },
    { name: "Suppliers", href: "/suppliers", icon: Building },
    { name: "Categories", href: "/categories", icon: Boxes },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "DB Backup", href: "/admin/backup", icon: Database },
  ];

  const links = [
    ...commonLinks,
    ...(role === "MANAGER" ? managerLinks : []),
    ...(role === "ADMIN" ? adminLinks : []),
  ];

  return (
    <aside className="w-64 bg-surface-low h-screen p-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-10 tracking-tighter text-foreground uppercase">
        Ether <span className="text-primary">OS</span>
      </h1>

      <nav className="flex flex-col gap-1.5">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-sm transition-all text-sm font-medium text-muted-foreground hover:bg-surface-high hover:text-foreground group"
            >
              <Icon size={18} className="transition-transform group-hover:scale-110" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}