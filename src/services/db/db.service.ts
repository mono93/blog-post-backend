import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DbService {

    private readonly logger = new Logger(DbService.name);

    constructor(
        @Inject('DATABASE_POOL') private pool: any
    ) { }

    async executeQuery(queryText: string, values: any[] = []) {
        try {
            this.logger.debug(`Executing query: ${queryText} (${values})`);
            let result = await this.pool.query(queryText, values);
            this.logger.debug(`Executed query, result ${JSON.stringify(result.rows[0].fn_signup)}`);
            let msgId = result.rows[0].fn_signup.msg_id
            if (msgId === 1) {
                return result.rows[0].fn_signup;
            } else {
                throw new Error("Error at db level");
            }
        } catch (err) {
            this.logger.error(`error ${err}`);
            throw new Error(err);
        }
    }

}
