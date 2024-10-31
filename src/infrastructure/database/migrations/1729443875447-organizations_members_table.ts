import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class OrganizationsMembersTable1729443875447 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'organizations_members',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isUnique: true,
          isPrimary: true,
        },
        {
          name: 'organization_id',
          type: 'bigint',
        },
        {
          name: 'user_id',
          type: 'bigint',
        },
        {
          name: 'role',
          type: 'varchar',
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
      ],
      foreignKeys: [
        {
          columnNames: ['organization_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'organizations',
          onDelete: 'CASCADE'
        },
        {
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE'
        }
      ]
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('organizations_members');
  }

}
