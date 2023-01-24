import React, { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Stack,
  Heading,
  Flex,
  HStack,
  List,
  ListItem,
  Link,
  useColorModeValue as mode,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

import { CartOrderSummary } from "@/components/CartOrderSummary";
import ItemCart from "@/components/ItemCart";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import api from "./api/api";
import { useQuery } from "react-query";

interface IFormInput {
  cpf: string;
  nome: string;
  telefone: number;
  precoTotal: number;
  items: {
    id: number;
    quantidade: number;
    preco: number;
    descricao: string;
  }[];
}

interface UnavailableItem {
  id: number;
  stock: number;
  descricao: string;
}

const Cart = ({}) => {
  const [carregando, setCarregando] = useState(false);

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    const ordem = { ...data };
    const items = Object.keys(cart.cart)
      .map(Number)
      .map((curr) => {
        const item = {
          id: cart.cart[curr].product.id,
          quantidade: cart.cart[curr].quantity,
          preco: cart.cart[curr].product.preco,
          descricao: cart.cart[curr].product.descricao,
        };
        return item;
      }, 0);
    ordem.items = items;
    const total = Object.keys(cart.cart)
      .map(Number)
      .reduce((prev, curr) => {
        return prev + cart.cart[curr].quantity * cart.cart[curr].product.preco;
      }, 0);
    ordem.precoTotal = total;
    const itemIds = ordem.items.map((item) => ({
      id: item.id,
      quantity: item.quantidade,
    }));

    //useQuery para hook de estoque
    const { data: stock, isLoading } = useQuery(
      JSON.stringify({ endpoint: "/stock", itemIds: itemIds }),
      async () => {
        const { data } = await axios.get("/stock", {
          params: {
            itemIds: itemIds,
          },
        });
        return data;
      },
      {
        staleTime: 30 * 60 * 1000, // 30 minutos
        cacheTime: 60 * 60 * 1000, // 1 hora
      }
    );

    if (isLoading) {
      setCarregando(true);
    }

    let canMakeOrder = true;
    const unavailableItems: UnavailableItem[] = [];

    let result: string = "api";

    ordem.items.map((item) => {
      const stockItem = stock.data.find((stock: any) => stock.id === item.id);
      if (!stockItem.isDisponivel) {
        canMakeOrder = false;
        unavailableItems.push({
          id: item.id,
          descricao: item.descricao,
          stock: stockItem.quantity,
        });
      }
    });

    if (canMakeOrder) {
      result = await api.post("/ordem", data);
    } else {
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>SEM ESTOQUE</AlertTitle>
          <AlertDescription>
            Estes items não estão disponíveis porque possuem essa quantidade em
            estoque:
          </AlertDescription>
          <AlertDescription>
            {unavailableItems.map(({ id, descricao, stock }) => (
              <div key={id}>
                Item descricao: {descricao} - Estoque: {stock}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      );
    }

    console.log(result);
  };
  const cart = useCart();

  return (
    <>
      <Header />
      <Box
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              Carrinho de compras
            </Heading>

            <Stack spacing="6">
              {Object.keys(cart.cart)
                .map(Number)
                .map((key) => {
                  const { product, quantity } = cart.cart[key];
                  return (
                    <List spacing={3} key={key}>
                      <ListItem>
                        <ItemCart {...product} quantidade={quantity} />
                      </ListItem>
                    </List>
                  );
                })}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>ou</p>
              <Link as={NextLink} href="/" color={mode("blue.500", "blue.200")}>
                Continue comprando
              </Link>
            </HStack>
          </Flex>
        </Stack>
        <Flex textAlign={"center"} align={"center"} justify={"flex-start"}>
          <Stack
            spacing={4}
            w={"full"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Formulário
            </Heading>
            <pre>{JSON.stringify(onSubmit, null, 2)}</pre>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="nome" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  {...register("nome")}
                  placeholder="Nome"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="CPF" isRequired>
                <FormLabel>CPF</FormLabel>
                <Input
                  {...register("cpf")}
                  placeholder="************"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="telefone" isRequired>
                <FormLabel>Telefone</FormLabel>
                <Input
                  {...register("telefone")}
                  placeholder="(**)*****-****"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <Stack mt={4} spacing={6} direction={["column", "row"]}>
                {carregando ? (
                  <Input
                    isReadOnly
                    type={"submit"}
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    value={"Loading"}
                  />
                ) : (
                  <Input
                    type={"submit"}
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    value={"Confirmar"}
                  />
                )}
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Cart;
