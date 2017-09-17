import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OAuthService } from 'angular-oauth2-oidc';
import OktaAuth from '@okta/okta-auth-js';
import { TimePage } from '../time/time';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const window: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private username: string;
  private password: string;

  constructor(public alertCtrl: AlertController, 
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private oauth: OAuthService) {
    oauth.redirectUri = 'https://localhost:8080/';
    oauth.clientId = '0oac1k4ljxVUy9G4J0h7';
    oauth.scope = 'openid profile';
    oauth.issuer = 'https://dev-349689.oktapreview.com/'
  }
  
  login() {
    this.oauth.createAndSaveNonce().then(nonce => {
      const client = new OktaAuth({
        clientId: this.oauth.clientId,
        redirectUri: this.oauth.redirectUri,
        url: 'https://dev-349689.oktapreview.com/',
        issuer: this.oauth.issuer
      });
      return client.signIn({
        username: this.username,
        password: this.password
      }).then((response) => {
        if (response.status === 'SUCCESS') {
          return client.token.getWithoutPrompt({
            nonce: nonce,
            responseType: ['id_token', 'token'],
            sessionToken: response.sessionToken,
            scopes: this.oauth.scope.split(' ')
          }).then((tokens) => {
            localStorage.setItem('access_token', tokens[1].accessToken);
            this.oauth.processIdToken(tokens[0].idToken, tokens[1].accessToken);
            this.navCtrl.push(TimePage);
          });
        } else {
          throw new Error(response.status + 'not handled.');
        }
      }).fail((error) => this.alertCtrl.create({title: 'Error', subTitle: error, buttons: ['OK']}).present());
    });
  }
  
  redirectLogin() {
    this.okLogin().then(success => {
      localStorage.setItem('access_token', success.access_token);
      this.oauth.processIdToken(success.id_token, success.access_token);
      this.navCtrl.push(TimePage);
    });
  }
  
  okLogin(): Promise<any> {
    return this.oauth.createAndSaveNonce().then(nonce => {
      let state: string = Math.floor(Math.random() * 1000000000).toString();
      if (window.crypto) {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        state = arr.join().toString();
      }
      return new Promise((res, rej) => {
        const authUrl = this.buildUrl(state, nonce);
        const web = window.cordova.InAppBrowser.open(authUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
        web.addEventListener('loadstart', (event) => {
          if ((event.url).indexOf('https://localhost:8080') === 0) {
            web.removeEventListener('exit', () => {});
            web.close();
            const parameters = ((event.url).split('#')[1]).split('&');
            const parsed = {};
            for (let i = 0; i < parameters.length; i++) {
              parsed[parameters[i].split('=')[0]] = parameters[i].split('=')[1];
            }
            const defErr = 'Problem with authentication';
            if (parsed['state'] !== state) {
              rej(defErr);
            } else if (parsed['access_token'] !== undefined && parsed['access_token'] !== null) {
              res(parsed);
            } else {
              rej(defErr);
            }
          }
        });
        web.addEventListener('exit', (event) => {
          rej('Sign in cancelled');
        });
      });
    });
  }
  
  buildUrl(state, nonce): string {
    return this.oauth.issuer + 'v1/authorize?' + 'client_id=' + this.oauth.clientId + '&' + 'redirect_uri=' + this.oauth.redirectUri + '&' +
    'response_type=id_token%20token&' + 'scope=' + encodeURI(this.oauth.scope) + '&' + 'state=' + state + '&nonce=' + nonce;
  }
  
  fbLogin() {
    this.oauth.createAndSaveNonce().then(nonce => {
      const client = new OktaAuth({
        clientId: this.oauth.clientId,
        redirectUri: this.oauth.redirectUri,
        url: 'https://dev-349689.oktapreview.com/',
        issuer: 'https://dev-349689.oktapreview.com/'
      });
      return client.token.getWithRedirect({
        nonce: nonce,
        scopes: this.oauth.scope.split(' ')
      }).then((token) => {
        
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
