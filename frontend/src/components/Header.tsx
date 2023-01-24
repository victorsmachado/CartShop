import {
  Box,
  Flex,
  Link,
  Stack,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";

import { CartContext, useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import { FaMoon, FaSun, FaShoppingCart, FaHome, FaUser } from "react-icons/fa";

const Header = () => {
  const cart = useCart();
  const itemsCount = Object.keys(cart.cart).length;
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "white" };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1.5rem"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      boxShadow="md"
      wrap={"wrap"}
    >
      <Flex align="center" justifyContent="center">
        <Link
          alignItems="center"
          href="/"
          fontWeight="medium"
          _hover={{ textDecoration: "none" }}
        >
          <Flex textAlign={"center"} alignItems="center" flexDir="column">
            <FaHome size="24px" />
            Home
          </Flex>
        </Link>
      </Flex>

      <Flex flexDir="row" align="center" justifyContent="center">
        <Flex align="center" justify="center" marginRight={10}>
          <Link
            href="/cart"
            fontWeight="medium"
            _hover={{ textDecoration: "none" }}
          >
            <Flex textAlign={"center"} alignItems="center" flexDir="column">
              <FaShoppingCart size="24px" />
              <Flex flexDir={"row"}>
                Carrinho
                {itemsCount > 0 && <span>({itemsCount})</span>}
              </Flex>
            </Flex>
          </Link>
        </Flex>
        <Flex align="center" justify="center">
          <Link
            href="/profile"
            fontWeight="medium"
            _hover={{ textDecoration: "none" }}
          >
            <Flex textAlign={"center"} alignItems="center" flexDir="column">
              <FaUser size="24px" />
              Profile
            </Flex>
          </Link>
        </Flex>

        <Box marginLeft={10}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
