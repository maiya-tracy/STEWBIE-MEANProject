import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-inspirationpage',
  templateUrl: './inspirationpage.component.html',
  styleUrls: ['./inspirationpage.component.css']
})
export class InspirationpageComponent implements OnInit {
  // search_bar: any;
  // test: any;
  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) { }
  ngOnInit() {
    // this.search_bar = "london";
    // this.getPlaces(this.search_bar);
    // this.getQuotes(this.search_bar);
  }
  // getPlaces(search_bar) {
  //   this._httpService.getPlaces(search_bar).subscribe(data => {
  //     console.log("**********", data);
  //     this.test = data;
  //     console.log(this.test)
  //   })
  // }
  // getQuotes() {
  //   this._httpService.getQuotes().subscribe(data => {
  //     console.log("**********Quotes*************", data.Quotes);
  //   })
  // }

}
