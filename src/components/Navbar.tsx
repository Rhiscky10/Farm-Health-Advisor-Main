import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Camera, History, Home } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const location = useLocation();
  const { t } = useI18n();

  const navItems = [
    { path: "/", icon: Home, label: t("nav.home") },
    { path: "/scan", icon: Camera, label: t("nav.scan") },
    { path: "/history", icon: History, label: t("nav.history") },
  ];

  return (
    <>
      {/* Desktop nav */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 glass-card border-b px-6 py-3 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">AgriScan AI</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/10 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t px-4 py-2 flex justify-around items-center">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute -top-0.5 h-1 w-8 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <LanguageToggle />
        <ThemeToggle />
      </nav>
    </>
  );
}
