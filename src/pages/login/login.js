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
var LoginPage = (function () {
    function LoginPage(alertCtrl, navCtrl, navParams, oauth) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oauth = oauth;
        oauth.redirectUri = 'https://localhost:8080/';
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
    LoginPage.prototype.redirectLogin = function () {
        var _this = this;
        this.okLogin().then(function (success) {
            localStorage.setItem('access_token', success.access_token);
            _this.oauth.processIdToken(success.id_token, success.access_token);
            _this.navCtrl.push(time_1.TimePage);
        });
    };
    LoginPage.prototype.okLogin = function () {
        var _this = this;
        return this.oauth.createAndSaveNonce().then(function (nonce) {
            var state = Math.floor(Math.random() * 1000000000).toString();
            if (window.crypto) {
                var arr = new Uint32Array(1);
                window.crypto.getRandomValues(arr);
                state = arr.join().toString();
            }
            return new Promise(function (res, rej) {
                var authUrl = _this.buildUrl(state, nonce);
                var web = window.cordova.InAppBrowser.open(authUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                web.addEventListener('loadstart', function (event) {
                    if ((event.url).indexOf('https://localhost:8080') === 0) {
                        web.removeEventListener('exit', function () { });
                        web.close();
                        var parameters = ((event.url).split('#')[1]).split('&');
                        var parsed = {};
                        for (var i = 0; i < parameters.length; i++) {
                            parsed[parameters[i].split('=')[0]] = parameters[i].split('=')[1];
                        }
                        var defErr = 'Problem with authentication';
                        if (parsed['state'] !== state) {
                            rej(defErr);
                        }
                        else if (parsed['access_token'] !== undefined && parsed['access_token'] !== null) {
                            res(parsed);
                        }
                        else {
                            rej(defErr);
                        }
                    }
                });
                web.addEventListener('exit', function (event) {
                    rej('Sign in cancelled');
                });
            });
        });
    };
    LoginPage.prototype.buildUrl = function (state, nonce) {
        return this.oauth.issuer + 'v1/authorize?' + 'client_id=' + this.oauth.clientId + '&' + 'redirect_uri=' + this.oauth.redirectUri + '&' +
            'response_type=id_token%20token&' + 'scope=' + encodeURI(this.oauth.scope) + '&' + 'state=' + state + '&nonce=' + nonce;
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
