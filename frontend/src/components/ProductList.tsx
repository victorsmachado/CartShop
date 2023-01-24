import { useCart } from "@/context/CartContext";
import { ProductProps } from "@/interfaces/ProductProps";
import { Box, Flex, Heading, List, ListItem, Stack } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import { ProductGrid } from "./ProductGrid";

interface Props {
  produtos: ProductProps[];
}

const ProductList: React.FC<Props> = ({ produtos }) => {
  const cart = useCart();
  return (
    <Flex align="center" justifyContent="center" direction="column" p={5}>
      <Heading>Lista de Produtos</Heading>

      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <ProductGrid>
          {produtos.map((produto) => (
            <ProductCard key={produto.id} {...produto} />
          ))}
        </ProductGrid>
      </Box>
    </Flex>
  );
};

export default ProductList;
