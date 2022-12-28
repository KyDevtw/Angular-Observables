import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // 透過 firstObsSubscription 去訂閱與銷毀 interval
    this.firstObsSubscription = interval(1000).subscribe(
      count => {
        console.log(count)
      }
    )
  }

  ngOnDestroy(): void {
    // unsubscribe() 銷毀 interval
    this.firstObsSubscription.unsubscribe();
  }
}
