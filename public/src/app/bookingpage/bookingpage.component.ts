import { Component, OnInit } from '@angular/core';
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

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  getWeather() {
    this._httpService.getWeather(this.city_name).subscribe(data => {
      console.log("Retrieved the weather from a city", data)
      this.weather["temperature"] = data['main']['temp'];
      this.weather["description"] = data['weather'][0]['description'];
    })
  }
}