import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';


@Injectable()
export class ReponseService {

    public success<T>(
        res: Response,
        statusCode: HttpStatus,
        message?: string,
        data?: T,
    ) {
        return res.status(statusCode).send({
            message: message ? message : 'OK',
            data: data
        })
    }

    public error<T>(
        res: Response,
        statusCode: HttpStatus,
        message?: string,
        error?: T,
    ) {
        return res.status(statusCode).send({
            message: message ? message : 'ERROR',
            error: error
        })
    }

}
