import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class UserTable1729441108047 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isUnique: true,
          isPrimary: true,
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'email_verified',
          type: 'boolean',
          default: false
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'image',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    })

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
