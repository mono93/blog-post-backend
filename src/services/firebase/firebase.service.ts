import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firebaseConfig } from 'src/config';

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

@Injectable()
export class FirebaseService {

    private readonly logger = new Logger(FirebaseService.name);
    private firebaseConfig = { ...firebaseConfig, apiKey: this.configService.get('FIREBASE_API_KEY') };

    private app = initializeApp(this.firebaseConfig);
    private auth = getAuth(this.app);

    constructor(
        private configService: ConfigService
    ) { }

    
    registerWithEmailAndPassword = async (email, password) => {
        try {
            this.logger.debug(`Executing firebase regsiter method with ${email} and ${password}`);
            const res = await createUserWithEmailAndPassword(this.auth, email, password);
            return res.user;
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

}