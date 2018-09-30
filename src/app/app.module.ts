import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// FIREBASE
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const firebaseConfigStreetCans = {
  apiKey: "your-very-own-firebase-api",
  authDomain: "xxxxxxxxxxx.firebaseapp.com",
  databaseURL: "https://yyyyyyyyyyy.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "zzzzzzzzzzz"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Redirect
}

//MATERIAL
//import { MaterialModule } from '@angular/material';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FaviconPipe } from './pipes/favicon.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { Nl2ParagraphPipe } from './pipes/nl2paragraph.pipe'
import { StatusPipe } from './pipes/status.pipe';
import { SafePipe } from './pipes/safe.pipe';

import { AppRouting } from './app.routing';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service'

import { JobService} from './services/job.service';

import { OfferEvent } from './events/offer.event';
import { OffersEvent } from './events/offers.event';

import { FilterInterface } from './interfaces/filter.interface';
import { OfferInterface } from './interfaces/offer.interface';
import { OffersInterface } from './interfaces/offers.interface';
import { DataSharing } from './data/data.sharing';

import { FnfComponent } from './home/404.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { FiltersComponent } from './filters/filters.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    Nl2ParagraphPipe,
    TruncatePipe,
    CapitalizePipe,
    FaviconPipe,
    StatusPipe,
    SafePipe,
    FnfComponent,
    AppComponent,
    AuthComponent,
    HomeComponent,
    LoginComponent,
    DashComponent,
    FiltersComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfigStreetCans, firebaseAuthConfig),
//    MaterialModule.forRoot(),
    AppRouting
  ],
  providers: [ AuthGuard, AuthService, JobService, OffersEvent, OfferEvent, DataSharing ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
