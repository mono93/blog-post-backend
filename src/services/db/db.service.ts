import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DbService {
    
    private readonly logger = new Logger(DbService.name);

    constructor(
        @Inject('DATABASE_POOL') private pool: any
    ) { }

    async executeQuery(queryText: string) {
        this.logger.debug(`Executing query: ${queryText}`);
        let result = await this.pool.query(queryText);
        this.logger.debug(`Executed query, result size ${result.rows.length}`);
        return result.rows;
    }

}
