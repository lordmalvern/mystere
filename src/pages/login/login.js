"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var okta_auth_js_1 = require('@okta/okta-auth-js');
var time_1 = require('../time/time');
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(alertCtrl, navCtrl, navParams, oauth) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oauth = oauth;
        oauth.redirectUri = 'https://localhost:8100/';
        oauth.clientId = '0oac1k4ljxVUy9G4J0h7';
        oauth.scope = 'openid profile';
        oauth.issuer = 'https://dev-349689.oktapreview.com/';
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.oauth.createAndSaveNonce().then(function (nonce) {
            var client = new okta_auth_js_1["default"]({
                clientId: _this.oauth.clientId,
                redirectUri: _this.oauth.redirectUri,
                url: 'https://dev-349689.oktapreview.com/',
                issuer: _this.oauth.issuer
            });
            return client.signIn({
                username: _this.username,
                password: _this.password
            }).then(function (response) {
                if (response.status === 'SUCCESS') {
                    return client.token.getWithoutPrompt({
                        nonce: nonce,
                        responseType: ['id_token', 'token'],
                        sessionToken: response.sessionToken,
                        scopes: _this.oauth.scope.split(' ')
                    }).then(function (tokens) {
                        localStorage.setItem('access_token', tokens[1].accessToken);
                        _this.oauth.processIdToken(tokens[0].idToken, tokens[1].accessToken);
                        _this.navCtrl.push(time_1.TimePage);
                    });
                }
                else {
                    throw new Error(response.status + 'not handled.');
                }
            }).fail(function (error) { return _this.alertCtrl.create({ title: 'Error', subTitle: error, buttons: ['OK'] }).present(); });
        });
    };
    LoginPage.prototype.fbLogin = function () {
        var _this = this;
        this.oauth.createAndSaveNonce().then(function (nonce) {
            var client = new okta_auth_js_1["default"]({
                clientId: _this.oauth.clientId,
                redirectUri: _this.oauth.redirectUri,
                url: 'https://dev-349689.oktapreview.com/',
                issuer: 'https://dev-349689.oktapreview.com/'
            });
            return client.token.getWithRedirect({
                nonce: nonce,
                scopes: _this.oauth.scope.split(' ')
            }).then(function (token) {
            });
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
