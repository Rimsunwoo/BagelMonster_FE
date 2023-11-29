import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteCart, getCart, PatchCartToBuy } from "@/app/api/carts";
import useAuth from "@/hooks/useAuth";

import type { BuyProductRequest } from "@/app/cart/page";

export default function useCart() {
  const router = useRouter();
  const { getCookie } = useAuth();
  const queryClient = useQueryClient();
  const { data: cartData } = useQuery({ queryKey: ["carts"], queryFn: () => getCart(getCookie()) });

  const token = getCookie();

  const deleteCartMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["carts"] }),
  });

  const postOrderMutation = useMutation({
    mutationFn: PatchCartToBuy,
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["carts"] }),
  });

  const deleteProduct = (productId: number) => {
    if (!cartData) return;
    deleteCartMutation.mutate({ cartId: cartData?.cartId, productId, token });
  };

  const deleteSelectedProducts = (selectedItems: number[]) => {
    if (selectedItems.length === 0 || !cartData) return;

    selectedItems.forEach((id) => {
      deleteCartMutation.mutate({ cartId: cartData.cartId, productId: id, token });
    });
  };

  const deleteAllProducts = () => {
    if (!cartData || cartData?.products.length === 0) return;
    const { products, cartId } = cartData;

    products.forEach((product) => {
      deleteCartMutation.mutate({ cartId: cartId, productId: product.productId, token });
    });
  };

  const buyHandler = ({ productsToBuy, totalPrice }: { productsToBuy: BuyProductRequest[]; totalPrice: number }) => {
    const emptyCart = !cartData || !productsToBuy || productsToBuy.length === 0;
    if (emptyCart) return;

    const productList = productsToBuy.map((item) => ({ productId: item.productId, quantity: item.quantity }));

    postOrderMutation.mutate({
      cartId: cartData.cartId,
      productList,
      token,
      totalPrice,
    });
    router.push(`/receipt/${cartData.cartId}`);
  };

  return { deleteProduct, deleteSelectedProducts, deleteAllProducts, buyHandler };
}
