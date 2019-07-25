import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-inspirationpage',
  templateUrl: './inspirationpage.component.html',
  styleUrls: ['./inspirationpage.component.css']
})
export class InspirationpageComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) { }
  ngOnInit() {
  }

}
