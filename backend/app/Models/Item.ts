import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Produto from "./Produto";

export default class Item extends BaseModel {
  @hasOne(() => Produto)
  public produtos: HasOne<typeof Produto>;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public quantidade: number;

  @column()
  public descricao: string;

  @column()
  public preco: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
