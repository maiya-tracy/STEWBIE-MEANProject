import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '/node_modules/official-lumx/dist/lumx.css']
})
export class AppComponent {
  title = 'public';
  constructor(private _route: ActivatedRoute, private _router: Router) { }

}
