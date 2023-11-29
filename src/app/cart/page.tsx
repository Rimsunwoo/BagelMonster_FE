"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import CartFooter from "@/components/cart/CartFooter";
import CartHeader from "@/components/cart/CartHeader";
import ProductList from "@/components/cart/ProductList";
import useAuth from "@/hooks/useAuth";

import { getCart } from "../api/carts";

import type { RootState } from "@/redux/config/configStore";

export interface BuyProductRequest {
  productId: number;
  quantity: number;
  price: number;
}

export default function Cart() {
  const { getCookie } = useAuth();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [productsToBuy, setProductsToBuy] = useState<BuyProductRequest[]>([]);
  const [total, setTotal] = useState<Omit<BuyProductRequest, "productId">>({ price: 0, quantity: 0 });

  const counter = useSelector((state: RootState) => state.productCount);

  const { data: cartData } = useQuery({ queryKey: ["carts"], queryFn: () => getCart(getCookie()) });

  useEffect(() => {
    if (!cartData) {
      setProductsToBuy([]);
      setTotal({ price: 0, quantity: 0 });
      return;
    }

    const products = cartData.products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      price: product.price,
    }));

    const total = cartData.products.reduce(
      (acc, product) => ({
        price: acc.price + product.quantity * product.price,
        quantity: acc.quantity + product.quantity,
      }),
      { price: 0, quantity: 0 },
    );

    setProductsToBuy(products);
    setTotal(total);
  }, [cartData]);

  useEffect(() => {
    if (productsToBuy.length === 0) return;

    const updatedProducts = productsToBuy.map((product) => {
      const [_, count] = Object.entries(counter).find((count) => +count[0] === product.productId)!;
      return { ...product, quantity: count };
    });

    const updatedTotal = updatedProducts.reduce(
      (acc, product) => ({
        price: acc.price + product.quantity * product.price,
        quantity: acc.quantity + product.quantity,
      }),
      { price: 0, quantity: 0 },
    );

    setProductsToBuy(updatedProducts);
    setTotal(updatedTotal);
  }, [counter]);

  const toggleProductSelection = (productId: number) => {
    const isProductSelected = selectedItems.includes(productId);
    setSelectedItems((prevItems) =>
      isProductSelected ? prevItems.filter((id) => id !== productId) : [...prevItems, productId],
    );
  };

  const toggleAllProductsSelection = () => {
    selectedItems.length === cartData?.products.length
      ? setSelectedItems([])
      : setSelectedItems(cartData?.products.map((product) => product.productId) ?? []);
  };

  return (
    <div className="w-full bg-white flex flex-col gap-6">
      <div className="w-full flexcol items-center gap-6">
        <CartHeader
          selectedItems={selectedItems}
          products={cartData?.products}
          toggleAllProductsSelection={toggleAllProductsSelection}
        />

        <div className="w-full bg-[#f5f5f5] h-2.5" />
        <ProductList
          productList={cartData?.products}
          cartId={cartData?.cartId}
          selectedItems={selectedItems}
          toggleProductSelection={toggleProductSelection}
        />
        <div className="w-full bg-[#f5f5f5] h-2.5" />

        <CartFooter total={total} productsToBuy={productsToBuy} />
      </div>
    </div>
  );
}
