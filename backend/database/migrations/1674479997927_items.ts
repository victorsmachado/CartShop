import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "items";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("quantidade", 10);
      table.string("descricao", 255);
      table.float("preco", 10);
      table
        .integer("ordem_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ordems")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .integer("produto_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("produtos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
