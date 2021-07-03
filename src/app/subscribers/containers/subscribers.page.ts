import { Component, ChangeDetectionStrategy, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { fromTag, Tag, TagActions } from '@clrepos/shared/tag';
import { trackById, errorImage, gotToTop } from '@clrepos/shared/shared/utils/utils';
import { fromRepos } from '@clrepos/shared/repos';
import { fromSubscriber, SubscriberActions } from '@clrepos/shared/subscribers';


@Component({
  selector: 'app-subscribers',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="container components-color">

      <ng-container *ngIf="(subscribers$ | async) as subscribers">
        <ng-container *ngIf="!(pending$ | async) || page > 1; else loader">
          <ng-container *ngIf="subscribers?.length > 0; else noData">

            <div class="header" no-border>
              <ion-back-button (click)="back()" defaultHref="/search" class="text-second-color" [text]="''"></ion-back-button>
              <h1 class="capital-letter">{{'COMMON.SUBSCRIBERS_TITLE' | translate}} {{title}}</h1>
              <div class="header-container-empty" ></div>
            </div>

            <ion-card class="fade-in-card" *ngFor="let subscriber of subscribers; trackBy: trackById" >
              <img [src]="subscriber?.avatar_url" (error)="errorImage($event)">
              <ion-card-header>
                <ion-card-title class="text-color capital-letter">{{subscriber?.login }}</ion-card-title>
              </ion-card-header>

              <ion-card-content class="text-color">
                <!-- <div class="displays-around margin-top font-small capital-letter">
                  <div class="width-half margin-top-10">{{'COMMON.COMMIT' | translate}}:</div>
                  <div class="width-half margin-top-10">{{subscriber?.commit?.sha}}</div>
                </div> -->

              <div class="font-small margin-top-10"><a [href]="subscriber?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a></div>
              </ion-card-content>

              <!-- <ion-ripple-effect></ion-ripple-effect> -->
            </ion-card>

            <!-- INFINITE SCROLL  -->
            <ng-container *ngIf="(totalPages$ | async) as total">
              <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
                <ion-infinite-scroll-content loadingSpinner="crescent" color="primary" class="loadingspinner">
                </ion-infinite-scroll-content>
              </ion-infinite-scroll>
            </ng-container>

          </ng-container>
        </ng-container>
      </ng-container>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <div class="header" no-border>
          <ion-back-button defaultHref="/search" class="text-second-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter">{{'COMMON.NO_SUBSCRIBERS_TITLE' | translate}}</h1>
          <div class="header-container-empty" ></div>
        </div>
        <div class="error-serve">
          <span class="text-second-color">{{'COMMON.NORESULT' | translate}}</span>
        </div>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <ion-spinner color="primary" class="loadingspinner"></ion-spinner>
      </ng-template>
    </div>

    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

  </ion-content>
  `,
  styleUrls: ['./subscribers.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscribersPage implements OnInit {

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  trackById = trackById;
  errorImage = errorImage;
  gotToTop = gotToTop;
  title: string = '';
  page: number = 1;
  showButton: boolean = false;

  infiniteScroll$ = new EventEmitter();
  pending$: Observable<boolean> = this.store.pipe(select(fromSubscriber.getPending));
  totalPages$: Observable<number> = this.store.pipe(select(fromSubscriber.getTotalPages));

  subscribers$: Observable<any> = combineLatest([
    this.route.params,
    this.infiniteScroll$.pipe(startWith(1))
  ]).pipe(
    filter(([{repoName},page]) => !!repoName),
    switchMap(([{repoName}]) =>
      this.store.pipe(select(fromRepos.getUserName),
        map(userName => {
          if(!userName){
            this.router.navigate(['/search'])
            return EMPTY
          }
          return userName
        }),
        tap((userName: any) => this.store.dispatch(SubscriberActions.loadSubscribers({repoName, userName, page:'1'}))),
        switchMap(() =>
          this.store.pipe(select(fromSubscriber.getSubscribers))
        )
      )
    )
  )

  // repoName
  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {

   }


  ngOnInit(): void{
    this.title = this.route.snapshot.params.repoName
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.page = this.page + 1;
      if(this.page >= total){
        this.ionInfiniteScroll.disabled = true
      }
      this.infiniteScroll$.next(this.page)
      event.target.complete();
    }, 500);
    this.content.scrollToBottom()
  }

  back(): void{
    this.store.dispatch(SubscriberActions.deleteSubscribers())
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}
