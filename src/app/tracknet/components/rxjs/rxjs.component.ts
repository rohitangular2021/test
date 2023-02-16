import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, of, tap, filter, debounceTime, distinctUntilChanged, switchMap, take, Observable, Subscriber, Subscription, scan, Subject, observeOn, asyncScheduler, map, delay, shareReplay, exhaustMap, switchAll, from, mergeMap, concatMap, pluck, catchError, forkJoin, combineLatest, merge } from 'rxjs';

import { TracketService } from '../../services/tracket.service';
import operators from './operators.json'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, AfterViewInit {

  @ViewChild('input', { static: false }) input: ElementRef;
  isShow: string = 'extras'
  data1: any = []
  rxjsoperator: any = []
  rxjsOperators: any = []
  searchKey: any = ''
  abc$: Observable<any> = new Observable()
  sMap: any
  btnActive: string = "extras";
  constructor(private http: HttpClient, private service: TracketService) { this.rxjsOperators = operators }

  ngOnInit(): void { }

  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        tap(async (event: KeyboardEvent) => {
          // console.log(`The input value is ${this.input.nativeElement.value}`);
        }),
        distinctUntilChanged(),
        switchMap(() => {
          return this.service.getStudentsfilter(this.input.nativeElement.value)
        }),
      )
      .subscribe(val => { this.sMap = val });

  }

  like(index) {
    this.rxjsOperators[index].likeCount = this.rxjsOperators[index].likeCount + 1
  }

  clearSearch() {
    this.searchKey = '';
  }

  tapObservable() {
    this.rxjsoperator = []
    this.isShow = "forAll"
    this.searchKey = "tap"
    this.btnActive = "tap"
    of(1, 2, 3, 4, 5, 6, 7, 8).pipe(tap((value) => {
      this.rxjsoperator.push(`value from tap ${value}`)
    })).subscribe(val => { this.data1.push(`${val}`) })
  }

  takeObservable() {
    this.rxjsoperator = []
    this.isShow = "forAll"
    this.btnActive = "take"
    this.searchKey = "take"
    of(1, 2, 3, 4, 5, 6, 7, 8)
      .pipe(take(4)).subscribe(val => {
        this.rxjsoperator.push(`${val}`)
      })
  }

  observableFn() {
    this.isShow = "forAll"
    this.searchKey = "observable"
    this.btnActive = "observable"
    this.rxjsoperator = []
    let observable$ = new Observable(subscriber => {
      subscriber.next(10)
      subscriber.next(20)
      subscriber.next(30)
      subscriber.next(40)
      setTimeout(() => {
        subscriber.next(50)
        subscriber.complete()
      }, 1000);

    })
    observable$.subscribe(item => {
      console.log(item);
    })

  }

  subscriptionFn() {
    this.isShow = "forAll"
    this.searchKey = "subscription"
    this.btnActive = "subscription"
    let subscription$: Subscription = new Subscription();
    const observable1 = of(1, 2, 3, 4, 5, 6, 7, 8);
    const observable2 = of(34, 24, 35, 46, 83, 12);

    subscription$.add(
      observable1.subscribe(data => {
        console.log(data);
      })
    )

    subscription$.add(
      observable2.subscribe(data => {
        console.log(data);
      })
    )

    setTimeout(() => {
      // this will unsubscribe BOTH subscription and childSubscription  
      subscription$.unsubscribe();
    }, 1000);


  }

  subjectFn() {
    this.isShow = "forAll"
    this.searchKey = "subjects"
    this.btnActive = "subjects"

    const subject = new Subject();
    subject.subscribe((data) => {
      console.log(data);
    });

    // subscriber 2  
    subject.subscribe((data) => {
      console.log(data);
    });

    subject.next(Math.random());
    // subject.next(10);

  }

  SchedulerFn() {
    this.isShow = "forAll"
    this.searchKey = "scheduler"
    this.btnActive = "scheduler"
    const observable = of(1, 2, 3);
    console.log("Before async subscribe");
    observable.pipe(observeOn(asyncScheduler)).subscribe({
      next(x) {
        console.log(`Got async value ${x}`);
      },
      error(err) {
        console.error(`Gomething wrong occurred: ${err}`);
      },
      complete() {
        console.log("This is done now.");
      }
    });
    console.log("After async subscribe");
  }

  getData = (param) => {
    return of(`retrieved new data with param ${param}`).pipe(
      delay(1000)
    )
  }

  switchMap() {
    this.rxjsoperator = []
    this.isShow = "forAll"
    this.searchKey = "switchMap"
    this.btnActive = "switchMap"
    // using a regular map
    from([1, 2, 3, 4]).pipe(
      map(param => this.getData(param))
    ).subscribe(val => val.subscribe(data => console.log("map   " + data)));

    // using map and switchAll
    from([1, 2, 3, 4]).pipe(
      map(param => this.getData(param)),
      switchAll()
    ).subscribe(val => { console.log("switchAll   " + val) });

    // using switchMap
    from([1, 2, 3, 4]).pipe(
      switchMap(param => this.getData(param))
    ).subscribe(val => console.log('switchmap   ' + val));
  }

  map() {
    this.rxjsoperator = []
    this.isShow = "forAll"
    this.searchKey = "map"
    this.btnActive = "map"
    this.abc$ = of([1, 2, 3, 4, 5, 6, 7, 8]).pipe(map(item => { return item }))

  }

  mergeConcatMap() {
    this.rxjsoperator = []
    this.isShow = "forAll"
    this.searchKey = "mergeConcatMap"
    this.btnActive = "mergeConcatMap"
    from([1, 2, 3, 4]).pipe(
      map(param => this.getData(param))
    ).subscribe(val => val.subscribe(data => console.log('map:  ', data)));

    // using mergeMap
    from([1, 2, 3, 4]).pipe(
      mergeMap(param => this.getData(param))
    ).subscribe(val => console.log('mergeMap:   ', val));

    // using concatMap
    from([1, 2, 3, 4]).pipe(
      concatMap(param => this.getData(param))
    ).subscribe(val => console.log('concatMap:   ', val));
  }

  exaustMap() {
    this.rxjsoperator = []
    this.isShow = "forAll"
    this.searchKey = "exaustMap"
    this.btnActive = "exaustMap"
    let srcObservable = of(1, 2, 3, 4)
    let innerObservable = of('A', 'B', 'C', 'D')

    srcObservable.pipe(
      exhaustMap(val => {
        console.log('Source value ' + val)
        console.log('starting new observable')
        return innerObservable
      })
    )
      .subscribe(ret => {
        console.log('Recd ' + ret);
      })
  }

  async pluck() {
    this.rxjsoperator = []
    this.isShow = "forAll"
    this.searchKey = "pluck"
    this.btnActive = "pluck"
    const source = from([
      {
        data:{ name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
        msg:'pluck',
        status:200,
        error:null
      }
      
    ]);

    let pqr = await source.pipe(
    pluck('data'),
    shareReplay(1),tap(item=>{console.log(item);}),
    catchError(async err => {console.log(err)})).toPromise()
    console.log(pqr);
  }

  forkJoin() {
    this.isShow = "forAll"
    this.searchKey = "forkJoin"
    this.btnActive = "forkJoin"
    let USERS = 'https://jsonplaceholder.typicode.com/users/';
    let POSTS = 'https://jsonplaceholder.typicode.com/posts/';

    const users = this.http.get(USERS)
    const posts = this.http.get(POSTS)

    forkJoin([users, posts])
      .subscribe(res => {
        let data = res;
        console.log('User and Post', res);
      });
  }

  combineLatest() {
    this.isShow = "forAll"
    this.searchKey = "combineLatest"
    this.btnActive = "combineLatest"
    let USERS = 'https://jsonplaceholder.typicode.com/users/';
    let POSTS = 'https://jsonplaceholder.typicode.com/posts/';

    const users = this.http.get(USERS)
    const posts = this.http.get(POSTS)

    combineLatest([users, posts])
      .subscribe(res => {
        let data = res;
        console.log('User and Post', res);
      });      
  }

  fromAndOf(){
    this.isShow = "forAll"
    this.btnActive = "fromAndOf"
    let data = [1, 2, 3, 4, 5, 6, 7, 8]

    of(data).subscribe(item=>{
      console.log(item);     
    })

    from(data).subscribe(item=>{
      console.log(item);     
    })

    of(...data).subscribe(item=>{
      console.log(item);     
    })

  }

  merge(){

    let  hello: any = [{
      author: 'bot',
      suggestedActions: [{
        type: 'reply',
        value: 'Request Notes'
      }, {
        type: 'reply',
        value: 'Raise a Query'
      }],
      timestamp: new Date(),
      text: 'Hey, This is AdGo Virtual Underwriter. How can I help you today ?'
    }]
    

    let abc = merge(from(hello),from(hello),from(hello)).pipe(scan((acc,  x) => console.log(acc,x)
    ))

    // abc.subscribe(data=>{console.log(data);
    // })
    
  }

}

