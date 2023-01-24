import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Item from "./Item";

export default class Ordem extends BaseModel {
  @hasMany(() => Item)
  public items: HasMany<typeof Item>;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nome: string;

  @column()
  public cpf: string;

  @column()
  public telefone: string;

  @column()
  public precoTotal: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
