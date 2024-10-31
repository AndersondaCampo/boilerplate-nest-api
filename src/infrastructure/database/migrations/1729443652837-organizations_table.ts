import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class OrganizationsTable1729443652837 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'organizations',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isUnique: true,
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'is_active',
          type: 'boolean',
          default: true
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('organizations');
  }

}
