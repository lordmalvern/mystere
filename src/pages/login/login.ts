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
    oauth.redirectUri = 'https://localhost:8100/';
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
