"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/data/types";

type Item = { product: Product; quantity: number };

type InquiryValue = {
  items: Item[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearItems: () => void;
  isInBasket: (id: string) => boolean;
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const InquiryContext = createContext<InquiryValue | null>(null);
const STORAGE_KEY = "starmed_inquiry_items";

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const addItem = useCallback((product: Product) => {
    setItems((current) =>
      current.some((i) => i.product.id === product.id)
        ? current
        : [...current, { product, quantity: 1 }],
    );
    setIsOpen(true);
  }, []);

  const removeItem = useCallback(
    (id: string) => setItems((current) => current.filter((i) => i.product.id !== id)),
    [],
  );

  const setQuantity = useCallback(
    (id: string, quantity: number) =>
      setItems((current) =>
        current.map((i) => (i.product.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)),
      ),
    [],
  );

  const value = useMemo<InquiryValue>(
    () => ({
      items,
      addItem,
      removeItem,
      setQuantity,
      clearItems: () => setItems([]),
      isInBasket: (id) => items.some((i) => i.product.id === id),
      isOpen,
      openDrawer: () => setIsOpen(true),
      closeDrawer: () => setIsOpen(false),
    }),
    [items, isOpen, addItem, removeItem, setQuantity],
  );

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) throw new Error("useInquiry must be used within an InquiryProvider");
  return context;
}
