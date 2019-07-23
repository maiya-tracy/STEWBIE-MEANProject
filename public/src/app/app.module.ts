import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InspirationpageComponent } from './inspirationpage/inspirationpage.component';
import { BookingpageComponent } from './bookingpage/bookingpage.component';
import { RatetrippageComponent } from './ratetrippage/ratetrippage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    InspirationpageComponent,
    BookingpageComponent,
    RatetrippageComponent,
    AboutpageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
