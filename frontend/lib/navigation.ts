/**
 * ============================================================================
 * AI Content Moderation Engine
 * Navigation Configuration
 * ============================================================================
 *
 * Single source of truth for application navigation.
 *
 * Every navigation component (Navbar, MobileNavigation, Footer, Sidebar)
 * consumes this file instead of hardcoding links.
 */

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  Github,
  Home,
  LayoutDashboard,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  disabled?: boolean;
}

export const APP_NAME = "AI Content Moderation Engine";

export const APP_SHORT_NAME = "ACME";

export const APP_TAGLINE =
  "Enterprise AI-powered content moderation platform.";

export const APP_DESCRIPTION =
  "Analyze user-generated content using AI to detect toxicity, offensive language, hate speech, threats, and other unsafe content with explainable predictions.";

export const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "API",
    href: "/docs",
    icon: Activity,
  },
];

export const secondaryNavigationItems: NavigationItem[] = [
  {
    label: "Documentation",
    href: "#",
    icon: BookOpen,
    disabled: true,
  },
];

export const socialLinks: NavigationItem[] = [
  {
    label: "GitHub",
    href: "#",
    icon: Github,
    external: true,
  },
];