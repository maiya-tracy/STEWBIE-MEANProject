import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SabreDevStudio } from 'sabre-dev-studio';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(
    private _http: HttpClient
  ) {

    // this.getData();
  }

  // getData() {
  //   console.log("***getdata*******")
  //   return this._http.get('/api/v1/cities')
  //   // var sabre_dev_studio = new SabreDevStudio({
  //   //   client_id:     'V1:k2q2wdgj6ccgvg1o:DEVCENTER:EXT',
  //   //   client_secret: '0o1IjbTO',
  //   //   uri:           'https://api.test.sabre.com'
  //   // });
  //   // var options = {};
  //   // var callback = function(error, data) {
  //   //   if (error) {
  //   //     console.log(error);
  //   //   } else {
  //   //     console.log(JSON.stringify(JSON.parse(data)));
  //   //   }
  //   // };
  //   //
  //   // sabre_dev_studio.get('/v2/shop/flights/fares?origin=SFO&lengthofstay=3%2C6%2C8&earliestdeparturedate=2019-07-29&latestdeparturedate=2019-08-03&location=ES%2CMX&minfare=250&maxfare=550&pointofsalecountry=US&topdestinations=5&pricepermile=0.2', options, callback);
  // }







  // addRestaurant(newRestaurant) {
  //   return this._http.post('/restaurant', newRestaurant)
  // }
  // deleteRestaurant(restaurantID) {
  //   return this._http.delete(`/restaurant/${restaurantID}`)
  // }
  // editRestaurant(currentRestaurant) {
  //   return this._http.put(`/restaurant/${currentRestaurant._id}`, currentRestaurant)
  // }
  // getRestaurants() {
  //   return this._http.get('/restaurant')
  // }
  // findOneRestaurant(restaurantID) {
  //   return this._http.get(`/restaurant/${restaurantID}`)
  // }
  // addReview(currentReview, restid) {
  //   return this._http.put(`/review/${restid}`, currentReview)
  // }
  // getReviews(restid) {
  //   return this._http.get(`/review/${restid}`)
  // }
}
