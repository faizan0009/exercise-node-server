import { google } from 'googleapis';


const googleConfig = {
    clientId: '674715050591-98rt320stur861vh7686n9dru9avm9hn.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: 'Yu7yC-nxEra-C3ok6VCdtgb6', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'http://localhost:8080/callback11' // this must match your google api settings
};

export class CodeMicroservice {
    static createConnection(): any {
        return new google.auth.OAuth2(
            googleConfig.clientId,
            googleConfig.clientSecret,
            googleConfig.redirect
        );
    }

    static getGooglePlusApi(auth:any):any {
        return google.plus({ version: 'v1', auth });
      }
      
      /**
       * Extract the email and id of the google account from the "code" parameter.
       */
     static async getGoogleAccountFromCode (code:any) {
        
        // get the auth "tokens" from the request
        const auth = this.createConnection();
        const data = await auth.getToken(code);
        const tokens = data.tokens;
        
        // add the tokens to the google api so we have access to the account
        
        auth.setCredentials(tokens);
        
        // connect to google plus - need this to get the user's email
        const plus = this.getGooglePlusApi(auth);
        const me = await plus.people.get({ userId: 'me' });
        
        // get the google id and email
        const userGoogleId = me.data.id;
        const userGoogleName = me.data.name;
        const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
        
        // return so we can login or sign up the user
        return {
          id: userGoogleId,
          name: userGoogleName,
          email: userGoogleEmail,
          tokens: tokens, // you can save these to the user if you ever want to get their details without making them log in again
        };
      }
      

    static code(request: any): Promise<object> {
        return new Promise((resolve, _reject) => {
           this.getGoogleAccountFromCode(request.code).then(res => {
            resolve({response : res})
           });
            
        })
    }

}



export default CodeMicroservice