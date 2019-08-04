import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})
export class BookingpageComponent implements OnInit {

  weather = {
    'description': "",
    'temperature': ""
  }
  city_name: any;
  ratings = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  submitForm() {
    this.getWeather();
    this.getCityRatings();
  }

  getWeather() {
    this._httpService.getWeather(this.city_name).subscribe(data => {
      console.log("Retrieved the weather from a city", data)
      this.weather["temperature"] = data['main']['temp'];
      this.weather["description"] = data['weather'][0]['description'];
    })
  }
  getCityRatings() {
    this._httpService.getCityRatings(this.city_name).subscribe(data => {
      console.log("retrieved city ratings", data)
      this.ratings = data['data'];
    })
  }
}
