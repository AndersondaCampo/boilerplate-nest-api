import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserSessionTable1729443532416 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'sessions',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isUnique: true,
          isPrimary: true,
        },
        {
          name: 'token',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'refresh_token',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'expires_at',
          type: 'timestamp'
        },
        {
          name: 'user_id',
          type: 'bigint'
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
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE'
        }
      ]
    });

    return await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('sessions');
  }

}
