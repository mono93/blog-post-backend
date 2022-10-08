import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import { ReponseService } from 'src/services';


@Injectable()
export class PreauthMiddleware implements NestMiddleware {

    private defaultApp: any;
    private readonly logger = new Logger(PreauthMiddleware.name);


    constructor(
        private apiReponse: ReponseService,
        private configService: ConfigService,
    ) {
        const firebaseParams = {
            type: this.configService.get('FIREBASE_TYPE'),
            projectId: this.configService.get('FIREBASE_PROJECT_ID'),
            privateKeyId: this.configService.get('FIREBASE_PRIVATE_KEY_ID'),
            privateKey: this.configService.get('FIREBASE_PRIVATE_KEY'),
            clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
            clientId: this.configService.get('FIREBASE_CLIENT_ID'),
            authUri: this.configService.get('FIREBASE_AUTH_URI'),
            tokenUri: this.configService.get('FIREBASE_TOKEN_URI'),
            authProviderX509CertUrl: this.configService.get('FIREBASE_AUTH_PROVIDER_x509_CERT_URL'),
            clientC509CertUrl: this.configService.get('FIREBASE_CLIENT_x509_CERT_URL')
        }
        this.defaultApp = firebase.initializeApp({ credential: firebase.credential.cert(firebaseParams) });
    }

    use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.logger.debug(`token ${token.replace('Bearer ', '')}`);
            this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''))
                .then(async decodedToken => {
                    const user = {
                        email: decodedToken.email
                    }
                    this.logger.debug(`User Email --> ${JSON.stringify(user)}`);
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