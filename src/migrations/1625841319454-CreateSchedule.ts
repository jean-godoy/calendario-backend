import {MigrationInterface, QueryRunner, Table, Timestamp} from "typeorm";

export class CreateSchedule1625841319454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'schedule',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'description',
                        type: 'varchar'          
                    },
                    {
                        name: 'hour',
                        type: 'int'
                    },
                    {
                        name: 'day',
                        type: 'int'
                    },
                    {
                        name: 'month',
                        type: 'int'
                    },
                    {
                        name: 'year',
                        type: 'int'
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
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable(' schedule');
    }

}
