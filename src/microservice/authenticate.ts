
import { MicroserviceResponse, MicroserviceRequest } from './models';
import { google } from 'googleapis';


const googleConfig = {
    clientId: '674715050591-98rt320stur861vh7686n9dru9avm9hn.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: 'Yu7yC-nxEra-C3ok6VCdtgb6', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'http://localhost:8080/callback11' // this must match your google api settings
};

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];



export class AuthenticateMicroservice {
   static createConnection(): object {
        return new google.auth.OAuth2(
            googleConfig.clientId,
            googleConfig.clientSecret,
            googleConfig.redirect
        );
    }

    static getConnectionUrl(auth: any): string {
        return auth.generateAuthUrl({
          access_type: 'offline',
          prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
          scope: defaultScope
        });
      }
      
      /**
       * Create the google url to be sent to the client.
       */
     static urlGoogle(): string {
        const auth = this.createConnection(); // this is from previous step
        const url = this.getConnectionUrl(auth);
        return url;
      }


    static authenticate(request: MicroserviceRequest): Promise<MicroserviceResponse> {
        return new Promise((resolve, _reject) => {

            const url = this.urlGoogle();
            resolve({ greeting: url });
        })
    }

    
}

export default AuthenticateMicroservice