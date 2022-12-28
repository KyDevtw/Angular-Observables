import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
    // this.firstObsSubscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count)
    //   }
    // )

    const customIntervalObservable = Observable.create(
      (observer) => {
        let count = 0;
        setInterval(()=>{
          observer.next(count);
          if( count === 2 ) {
            // observer.error 會暫停並且拋出錯誤
            observer.complete();
          }
          if( count > 3 ) {
            // observer.error 會暫停並且拋出錯誤
            observer.error( new Error('Count is greater then 3!'));
          }
          count++;
        }, 1000)
      }
    )

    // subscribe 有三個函示, 依序為 next error complete
    this.firstObsSubscription = customIntervalObservable.pipe(
      filter( 
        (data: number) => {
          return data > 0
      }),
      map(
        (data: number) => {
          return 'Round ' + (data + 1);
      })
    ).subscribe( 
      data => {console.log(data)},
      error => { console.log(error.message) },
      // complete 不會傳遞參數
      _complete => { console.log("Method complete~") }
    );
  }

  ngOnDestroy(): void {
    // unsubscribe() 銷毀 interval
    this.firstObsSubscription.unsubscribe();
  }
}
