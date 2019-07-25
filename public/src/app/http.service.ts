import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private _http: HttpClient) { }

  getPlaces(search_bar) {
    unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/USA/USD/en-US/?query=london")
      .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
      .header("X-RapidAPI-Key", "efa1e54accmsh0ee65ac19151100p135c17jsn791d4358b1eb")
      .end(function(result) {
        console.log('****************************************************************************************')
        console.log(result.status, result.headers, result.body);
        console.log('****************************************************************************************')
        return result.body;
      });
  }
  getQuotes(search_bar) {
    unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/anytime?inboundpartialdate=anytime")
      .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
      .header("X-RapidAPI-Key", "efa1e54accmsh0ee65ac19151100p135c17jsn791d4358b1eb")
      .end(function(result) {
        console.log(result.status, result.headers, result.body);
        return (result.body)
      });
  }






getWeather(city_name) {
  return this._http.get(`#`)
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
