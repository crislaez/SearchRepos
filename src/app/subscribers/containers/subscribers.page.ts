import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromRepos } from '@clrepos/shared/repos';
import { fromSubscriber, SubscriberActions } from '@clrepos/shared/subscribers';
import { errorImage, gotToTop, trackById } from '@clrepos/shared/utils/utils/functions';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-subscribers',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="empty-header components-color-primary">
    </div>

    <div class="container components-color-second">
      <ng-container *ngIf="(subscribers$ | async) as subscribers">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 1; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="subscribers?.length > 0; else noData">

                <!-- INFINITE SCROLL CONTAINER -->
                <app-infinite-scroll-wrapper
                  *ngIf="(totalPages$ | async) as total"
                  [status]="status"
                  [total]="total"
                  [page]="statusComponent?.page"
                  [from]="'subscribers'"
                  [items]="subscribers"
                  (loadDataTrigger)="loadData($event)">
                </app-infinite-scroll-wrapper>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <div class="header" no-border>
          <ion-back-button defaultHref="/search" class="text-second-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter text-second-color font-title">{{'COMMON.NO_SUBSCRIBERS_TITLE' | translate}}</h1>
          <div class="header-container-empty" ></div>
        </div>
        <div class="error-serve">
          <span class="text-second-color">{{'COMMON.NORESULT' | translate}}</span>
        </div>
      </ng-template>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <div class="header" no-border>
          <ion-back-button defaultHref="/search" class="text-second-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter text-second-color font-title">{{'COMMON.NO_SUBSCRIBERS_TITLE' | translate}}</h1>
          <div class="header-container-empty" ></div>
        </div>
        <div class="error-serve">
          <div>
            <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
            <br>
            <span class="text-second-color">{{'COMMON.ERROR' | translate}}</span>
          </div>
        </div>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <ion-spinner class="loadingspinner"></ion-spinner>
      </ng-template>
    </div>

    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="back-color color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
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
  gotToTop = gotToTop;
  title: string = '';
  page: number = 1;
  showButton: boolean = false;

  statusComponent: {page: number} = {
    page:1,
  };

  infiniteScroll$ = new EventEmitter<{page: number}>();
  status$ = this.store.pipe(select(fromSubscriber.getStatus));
  totalPages$: Observable<number> = this.store.select(fromSubscriber.getTotalPages)

  subscribers$ = combineLatest([
    this.route.params,
    this.infiniteScroll$.pipe(startWith(this.statusComponent))
  ]).pipe(
    withLatestFrom(
      this.store.pipe(select(fromRepos.getUserName))
    ),
    filter(([[{repoName}, {page}], userName]) => !!userName && !!repoName && !!page),
    tap(([[{repoName}, {page}], userName]) =>
      this.store.dispatch(SubscriberActions.loadSubscribers({repoName, userName: (userName as string), page: page?.toString()}))
    ),
    switchMap(() =>
      this.store.pipe(select(fromSubscriber.getSubscribers))
    )
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void{
    this.title = this.route.snapshot.params.repoName;
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    this.statusComponent = { page: this.statusComponent?.page + 1}

    if(this.statusComponent?.page >= total){
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true;
    }
    this.infiniteScroll$.next(this.statusComponent);

    event.target.complete();
    // this.content.scrollToBottom()
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
