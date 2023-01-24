import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public descricao: string;

  @column()
  public unidade: string;

  @column()
  public volume: number;

  @column()
  public marca: string;

  @column()
  public peso: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
