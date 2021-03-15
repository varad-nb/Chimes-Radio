import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    NativeAudio,
    SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
