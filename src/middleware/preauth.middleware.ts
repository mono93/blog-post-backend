import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import { ReponseService } from 'src/services';
import * as serviceAccount from '../config/blog-post-authentication-firebase-adminsdk-c1uqa-1cfca32aa6.json';

const firebaseParams = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}

@Injectable()
export class PreauthMiddleware implements NestMiddleware {

    private defaultApp: any;
    private readonly logger = new Logger(PreauthMiddleware.name);


    constructor(
        private apiReponse: ReponseService,
    ) {
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseParams),
        });
    }

    use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''))
                .then(async decodedToken => {
                    const user = {
                        email: decodedToken.email
                    }
                    req['user'] = user;
                    next();
                }).catch(error => {
                    this.logger.error(`error ${error}`);
                    this.accessDenied(res);
                });
        } else {
            next();
        }
    }

    private accessDenied(res: Response) {
        return this.apiReponse.success(res, HttpStatus.FORBIDDEN, 'Access Denied');
    }

}