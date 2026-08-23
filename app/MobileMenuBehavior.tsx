"use client";

import { useEffect } from "react";

export default function MobileMenuBehavior() {
  useEffect(() => {
    const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu");
    if (!menu) return;

    const closeMenu = () => {
      if (menu.open) menu.open = false;
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".mobile-menu a")) {
        closeMenu();
      }
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 2) {
        closeMenu();
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", closeMenu);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", closeMenu);
    };
  }, []);

  return null;
}
