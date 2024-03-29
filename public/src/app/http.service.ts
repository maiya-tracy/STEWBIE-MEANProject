import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

addReview(new_review) {
  return this._http.post('/ratings', new_review)
}
getRatings() {
  return this._http.get('/ratings')
}
getCityRatings(city_name) {
  return this._http.get(`/ratings/city`, city_name)
}

getPlaces(search_bar) {
  return this._http.post('/places', search_bar)
}



getWeather(city_name) {
  return this._http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&APPID=d4c3b5da6a381136b579ef19ed874c1c&units=imperial
  `)
}


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
