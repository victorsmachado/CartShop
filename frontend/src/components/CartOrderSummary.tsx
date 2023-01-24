import { useCart } from "@/context/CartContext";
import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

export const CartOrderSummary = () => {
  const cart = useCart();
  const itemsCount = Object.keys(cart.cart)
    .map(Number)
    .reduce((prev, curr) => {
      return prev + cart.cart[curr].quantity;
    }, 0);

  const total = Object.keys(cart.cart)
    .map(Number)
    .reduce((prev, curr) => {
      return prev + cart.cart[curr].quantity * cart.cart[curr].product.preco;
    }, 0);

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Ordem de Pedido</Heading>

      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total:
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            R${total.toFixed(2).replace(".", ",")}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Quantidade total de produtos:
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {itemsCount}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};
