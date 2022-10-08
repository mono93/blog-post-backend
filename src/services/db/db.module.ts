import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DbService } from './db.service';

const databasePoolFactory = async (configService: ConfigService) => {
    return new Pool({
        user: configService.get('POSTGRES_USER'),
        host: configService.get('POSTGRES_HOST'),
        database: configService.get('POSTGRES_DB'),
        password: configService.get('POSTGRES_PASSWORD'),
        port: 5432,
    });
};

@Module({
    providers: [
        {
            provide: 'DATABASE_POOL',
            inject: [ConfigService],
            useFactory: databasePoolFactory,
        },
        DbService
    ],
    exports: [DbService]
})
export class DbModule { }