import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DbService {

    private readonly logger = new Logger(DbService.name);

    constructor(
        @Inject('DATABASE_POOL') private pool: any
    ) { }

    async executeQuery(functionName: string, values: any[] = []) {
        try {
            this.logger.debug(`Executing query: SELECT public.${functionName} ($1) (${values})`);
            let result = await this.pool.query(`SELECT public.${functionName} ($1)`, values);
            this.logger.debug(`Executed query, result ${JSON.stringify(result.rows[0][functionName])}`);
            let msgId = result.rows[0][functionName].msg_id
            if (msgId === 0) {
                throw new Error("Error at db level");
            } else {
                return result.rows[0][functionName];
            }
        } catch (err) {
            this.logger.error(`Error ${err}`);
            throw new Error(err);
        }
    }

}
