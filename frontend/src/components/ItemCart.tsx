import {
  CloseButton,
  Flex,
  Input,
  Link,
  Select,
  SelectProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { CartItemProps } from "@/interfaces/CartItemProps";
import CartProductMeta from "./CartProductMeta";
import { CartProps } from "@/interfaces/CartProps";
import { useCart } from "@/context/CartContext";

const ItemCart: React.FC<CartProps> = (product) => {
  const cart = useCart();
  const remove = (id: number) => () => {
    cart.removeFromCart(id);
  };

  const changeQuantity =
    (id: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      cart.changeQuantity(id, Number(evt.target.value));
    };
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        descricao={product.descricao}
        image={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
        }
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <Flex flexDir={"column"} textAlign={"center"}>
          <Text>Preço U</Text>
          <Text>R${product.preco.toFixed(2).replace(".", ",")}</Text>
        </Flex>
        <Flex flexDir={"column"} textAlign={"center"} alignItems={"center"}>
          <Text>Quantidade</Text>
          <Input
            type={"number"}
            width={"50%"}
            defaultValue={product.quantidade}
            onBlur={changeQuantity(product.id)}
          />
        </Flex>

        <Flex flexDir={"column"} textAlign={"center"}>
          <Text>Preço total</Text>
          <Text>
            R$
            {(product.preco * product.quantidade).toFixed(2).replace(".", ",")}
          </Text>
        </Flex>
        <CloseButton onClick={remove(product.id)} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Flex flexDir={"column"} textAlign={"center"}>
          <Text>Preço U</Text>
          <Text>R${product.preco}</Text>
        </Flex>
        <Flex flexDir={"column"} textAlign={"center"} alignItems={"center"}>
          <Text>Quantidade</Text>
          <Input
            type={"number"}
            width={"30%"}
            defaultValue={product.quantidade}
            onBlur={changeQuantity(product.id)}
          />
        </Flex>

        <Flex flexDir={"column"} textAlign={"center"}>
          <Text>Preço total</Text>
          <Text>R${(product.preco * product.quantidade).toFixed(2)}</Text>
        </Flex>
        <CloseButton onClick={remove(product.id)} />
      </Flex>
    </Flex>
  );
};

export default ItemCart;
