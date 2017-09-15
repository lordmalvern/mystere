import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
    
  }
  
  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'user_location'])
    .then((res : FacebookLoginResponse) => this.navCtrl.push(TimePage, res))
    .catch(e => this.alertCtrl.create({title: 'Error', subTitle: 'Facebook authentication failed.', buttons: ['OK']}).present());
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
