import { HomepageComponent } from './homepage/homepage.component';
import { InspirationpageComponent } from './inspirationpage/inspirationpage.component';
import { BookingpageComponent } from './bookingpage/bookingpage.component';
import { RatetrippageComponent } from './ratetrippage/ratetrippage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'inspo', component: InspirationpageComponent },
  { path: 'about', component: AboutpageComponent },
  { path: 'booking', component: BookingpageComponent },
  { path: 'rating', component: RatetrippageComponent },

  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component: HomepageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
