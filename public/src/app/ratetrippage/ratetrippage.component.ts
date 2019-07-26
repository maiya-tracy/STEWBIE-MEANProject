import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-ratetrippage',
  templateUrl: './ratetrippage.component.html',
  styleUrls: ['./ratetrippage.component.css']
})
export class RatetrippageComponent implements OnInit {

  newRating = { adventure: "", budget: "", transportation: [], culture: [], dodos: "", review: ""};
  postErrors = { adventure: "", budget: "", transportation: "", culture: "", dodos: "", review: ""};

  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) { }

  ngOnInit() {
  }
  submitrating(): void {
    this.postErrors = { adventure: "", budget: "", transportation: "", culture: "", dodos: "", review: ""};
    this._httpService.addReview(this.newRating).subscribe(data => {
      if (data['error']) {
        console.log("error creating rating", data)
        if (data['error']['errors']['adventure']) { this.postErrors['adventure'] = data['error']['errors']['adventure']['message'] }
        if (data['error']['errors']['budget']) { this.postErrors['budget'] = data['error']['errors']['budget']['message'] }
      } else {
        console.log("added rating", data);
        this.newRating = { adventure: "", budget: "", transportation: [], culture: [], dodos: "", review: ""};
        this._router.navigate(['/rating']);
      }
    })
  }
  setAdventure(adventure_value) {
    this.newRating.adventure = adventure_value
    console.log(this.newRating);
  }
  setBudget(budget_value) {
    this.newRating.budget = budget_value
    console.log(this.newRating);
  }
  setTransportation(transportation_value) {
    this.newRating.transportation.push(transportation_value)
    console.log(this.newRating);
  }
  setCulture(culture_value) {
    this.newRating.culture.push(culture_value)
    console.log(this.newRating);
  }
  setDodos(dodo_value) {
    this.newRating.dodos = dodo_value
    console.log(this.newRating);
  }
}
