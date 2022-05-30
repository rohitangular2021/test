import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './app.reducer';
import { AppService } from './app.service';
import { MaterialModule } from './material/material.module';
import { Error404Component } from './error404/error404.component';
import { SharedService } from './services/shared.service';
import { AuthLoginService } from './auth/services/auth.service';
import { IntercepterService } from './tracknet/services/intercepter.service';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MaterialModule,HttpClientModule,BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
        metaReducers, runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        }
      }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [AppService,HttpClient,SharedService,AuthLoginService, {
    provide: HTTP_INTERCEPTORS,
    useClass: IntercepterService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
