import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const produtos = [
  {
    id: 1,
    descricao: "ALION",
    unidade: "L",
    volume: 1,
    marca: "BAYER",
    peso: "1.1KG",
    preco: 12.8,
    imagem:
      "https://neilpatel.com/wp-content/uploads/2019/07/mini-caixas-de-produtos-em-cima-de-laptop.jpeg",
  },
  {
    id: 2,
    descricao: "VIR CONTROL",
    unidade: "KG",
    volume: 5,
    marca: "SIMBIOSE",
    peso: "5.01KG",
    preco: 99.9,
    imagem:
      "https://neilpatel.com/wp-content/uploads/2019/07/mini-caixas-de-produtos-em-cima-de-laptop.jpeg",
  },
  {
    id: 3,
    descricao: "CURZATE",
    unidade: "GL",
    volume: 5,
    marca: "CORTEVA",
    peso: "5.01KG",
    preco: 78.95,
    imagem:
      "https://neilpatel.com/wp-content/uploads/2019/07/mini-caixas-de-produtos-em-cima-de-laptop.jpeg",
  },
  {
    id: 4,
    descricao: "DMA",
    unidade: "L",
    volume: 1,
    marca: "CORTEVA",
    peso: "1.03KG",
    preco: 129.9,
    imagem:
      "https://neilpatel.com/wp-content/uploads/2019/07/mini-caixas-de-produtos-em-cima-de-laptop.jpeg",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Loja Teste</title>
      </Head>
      <Header />
      <ProductList produtos={produtos} />
    </>
  );
}
