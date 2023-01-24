import { CartProductMetaProps } from "@/interfaces/CartProductMetaProps";
import {
  Box,
  Image,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

const CartProductMeta: React.FC<CartProductMetaProps> = (cartProduct) => {
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={cartProduct.image}
        alt={"teste"}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text wordBreak={"break-word"} fontWeight="medium">
            {cartProduct.descricao}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CartProductMeta;
