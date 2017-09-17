"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var splash_screen_1 = require('@ionic-native/splash-screen');
var status_bar_1 = require('@ionic-native/status-bar');
var angular_oauth2_oidc_1 = require('angular-oauth2-oidc');
var app_component_1 = require('./app.component');
var home_1 = require('../pages/home/home');
var login_1 = require('../pages/login/login');
var time_1 = require('../pages/time/time');
var rules_1 = require('../pages/rules/rules');
var map_1 = require('../pages/map/map');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                home_1.HomePage,
                login_1.LoginPage,
                time_1.TimePage,
                rules_1.RulesPage,
                map_1.MapPage
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                angular_oauth2_oidc_1.OAuthModule.forRoot(),
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp)
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                home_1.HomePage,
                login_1.LoginPage,
                time_1.TimePage,
                rules_1.RulesPage,
                map_1.MapPage
            ],
            providers: [
                angular_oauth2_oidc_1.OAuthService,
                status_bar_1.StatusBar,
                splash_screen_1.SplashScreen,
                { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
