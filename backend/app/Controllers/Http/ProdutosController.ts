// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Produto from "App/Models/Produto";

import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ProdutosController {
  public async index({ response }) {
    const posts = await Produto.all();

    return response.ok(posts);
  }

  public async store({ request, response }) {
    const postSchema = schema.create({
      descricao: schema.string([rules.maxLength(255)]),
      unidade: schema.string([rules.maxLength(10)]),
      volume: schema.number(),
      marca: schema.string([rules.maxLength(255)]),
      peso: schema.string([rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: postSchema });
    const produto: Produto = await Produto.create(payload);

    return response.ok(produto);
  }

  public async stock({ request }: HttpContextContract) {
    const itemIds = request.input("itemIds");
    const itemIdsWithQuantity = itemIds.map((item) => item.id);
    const stock = await Database.from("produtos")
      .whereIn("id", itemIdsWithQuantity)
      .select("id", "volume");
    const response = itemIds.map((item) => {
      const stockProduct = stock.find((p) => p.id === item.id);
      return {
        id: item.id,
        isDisponivel: stockProduct.quantity >= item.quantity,
      };
    });
    return response;
  }
}
