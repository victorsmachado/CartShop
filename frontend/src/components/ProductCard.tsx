import { useCart } from "@/context/CartContext";
import { ProductProps } from "@/interfaces/ProductProps";
import {
  AspectRatio,
  Box,
  Button,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

export const ProductCard = (produto: ProductProps) => {
  const cart = useCart();
  const add = (produto: ProductProps) => {
    cart.addToCart(produto);
  };
  return (
    <Stack spacing={useBreakpointValue({ base: "4", md: "5" })}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
            }
            alt={produto.descricao}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: "md", md: "xl" })}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Stack spacing="1" alignItems={"center"}>
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            {produto.descricao}
          </Text>
        </Stack>
      </Stack>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            R${produto.preco.toFixed(2).replace(".", ",")}
          </Text>
        </Stack>
      </Stack>
      <Stack align="center">
        <Button colorScheme="blue" width="full" onClick={() => add(produto)}>
          Add ao carrinho
        </Button>
      </Stack>
    </Stack>
  );
};
