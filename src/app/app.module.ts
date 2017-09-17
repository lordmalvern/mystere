import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TimePage } from '../pages/time/time';
import { RulesPage } from '../pages/rules/rules';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TimePage,
    RulesPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    OAuthModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TimePage,
    RulesPage,
    MapPage
  ],
  providers: [
    OAuthService,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
