import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Ordem from "App/Models/Ordem";
import Item from "App/Models/Item";

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export const CartSchema = schema.create({
  cpf: schema.string({}, [rules.required()]),
  nome: schema.string({}, [rules.required()]),
  telefone: schema.string({}, [rules.required()]),
  precoTotal: schema.number(),
});

export const ItemSchema = schema.create({
  nome: schema.string(),
  quantidade: schema.number(),
  preco: schema.number(),
  ordem_id: schema.number(),
  produto_id: schema.number(),
});

export default class OrdemsController {
  async create({ request, response }) {
    const data = await request.validate({
      schema: CartSchema,
    });
    const items = await request.validate({
      schema: ItemSchema,
    });

    try {
      const ordem = await Ordem.create(data);
      const ordem_id = ordem.id;
      items.map((item) => {
        item.ordem_id = ordem_id;
        Item.create(item);
      });
      return ordem_id;
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
