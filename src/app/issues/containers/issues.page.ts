import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromIssue, Issue } from '@clrepos/shared/issue';
import { IssueActions } from '@clrepos/shared/issue';
import { fromRepos } from '@clrepos/shared/repos';
import { errorImage, trackById, gotToTop } from '@clrepos/shared/shared/utils/utils';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-issues',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="container components-color-second">

      <ng-container *ngIf="(issues$ | async) as isssues">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 1; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">

              <ng-container *ngIf="isssues?.length > 0 ; else noData">

                <div class="header fade-in-card" no-border>
                  <ion-back-button (click)="back()" defaultHref="./search" class="text-second-color" [text]="''"></ion-back-button>
                  <h1 class="capital-letter text-second-color font-title">{{'COMMON.ISSUE_TITLE' | translate}} {{title}}</h1>
                  <div class="header-container-empty" ></div>
                </div>

                <ion-card class="fade-in-card" *ngFor="let issue of isssues; trackBy: trackById" >
                  <ion-card-header>
                    <ion-card-title class="text-second-color capital-letter font-big">{{issue?.title }}</ion-card-title>
                  </ion-card-header>

                  <ion-card-content class="text-second-color">
                    <div class="font-medium" *ngIf="issue?.body" [innerHTML]="issue?.body"></div>
                    <!-- <div ><a class="font-small" [routerLink]="['/issues/'+issue?.name]">{{'COMMON.SEE_ISSUES' | translate}}</a></div> -->
                    <div class="displays-around margin-top font-small capital-letter">
                      <div class="width-half margin-top-10">{{'COMMON.STATE' | translate}}:</div>
                      <div class="width-half margin-top-10">{{issue?.state}}</div>

                      <div class="width-half margin-top-10">{{'COMMON.CLOSE' | translate}}:</div>
                      <div class="width-half margin-top-10">
                        <ng-container *ngIf="issue?.closed_at; else noComment">{{issue?.closed_at}}</ng-container>
                        <ng-template #noComment>{{'COMMON.NO' | translate}}</ng-template>
                      </div>

                      <div class="width-half margin-top-10">{{'COMMON.CREATE' | translate}}:</div>
                      <div class="width-half margin-top-10">{{issue?.created_at | date}}</div>

                      <div class="width-half margin-top-10">{{'COMMON.UPDATE' | translate}}:</div>
                      <div class="width-half margin-top-10">{{issue?.updated_at | date}}</div>

                      <div class="width-half margin-top-10">{{'COMMON.AUTHOR_ASSOCIATION' | translate}}:</div>
                      <div class="width-half margin-top-10">{{issue?.author_association}}</div>

                      <div class="width-half margin-top-10">{{'COMMON.COMMENTS_TITLE' | translate}}:</div>
                      <div class="width-half margin-top-10">{{issue?.comments}}</div>

                      <ng-container *ngIf="issue?.labels?.length > 0">
                        <div class="width-half margin-top-10">{{'COMMON.LABEL' | translate}}:</div>
                        <div class="width-half margin-top-10"><div class="chip" *ngFor="let label of issue?.labels; trackBy: trackById" [ngStyle]="{'background-color':'#'+label?.color}">{{label?.name}}</div></div>
                      </ng-container>
                    </div>

                    <div class="font-small margin-top-10"><a [href]="issue?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a></div>

                    <div class="font-small margin-top-10" *ngIf="issue?.comments > 0"><ion-button class="font-small back-color" [routerLink]="['/comments/'+issue?.number]">{{'COMMON.SEE_COMMENTS' | translate}}</ion-button></div>
                  </ion-card-content>

                  <!-- <ion-ripple-effect></ion-ripple-effect> -->
                </ion-card>

                <!-- INFINITE SCROLL  -->
                <ng-container *ngIf="(totalPages$ | async) as total">
                  <ng-container *ngIf="statusComponent?.page < total">
                    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
                      <ion-infinite-scroll-content class="loadingspinner">
                        <ion-spinner *ngIf="status === 'pending'" class="loadingspinner"></ion-spinner>
                      </ion-infinite-scroll-content>
                    </ion-infinite-scroll>
                  </ng-container>
                </ng-container>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>


      <!-- IS NO DATA  -->
      <ng-template #noData>
        <div class="header" no-border>
          <ion-back-button defaultHref="./search" class="text-second-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter text-second-color font-title">{{'COMMON.NO_ISSUE_TITLE' | translate}}</h1>
          <div class="header-container-empty" ></div>
        </div>
        <div class="error-serve">
          <span class="text-second-color">{{'COMMON.NORESULT' | translate}}</span>
        </div>
      </ng-template>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <div class="header" no-border>
          <ion-back-button defaultHref="./search" class="text-second-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter text-second-color font-title">{{'COMMON.NO_ISSUE_TITLE' | translate}}</h1>
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

  </ion-content >
  `,
  styleUrls: ['./issues.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssuesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  trackById = trackById;
  errorImage = errorImage;
  gotToTop = gotToTop;
  title: string = '';
  showButton: boolean = false;

  statusComponent: {page: number} = {
    page:1,
  };

  infiniteScroll$ = new EventEmitter<{page: number}>();
  status$ = this.store.pipe(select(fromIssue.getStatus));
  totalPages$: Observable<number> = this.store.pipe(select(fromIssue.getTotalPages));

  issues$: Observable<Issue[]> = combineLatest([
    this.route.params,
    this.infiniteScroll$.pipe(startWith(this.statusComponent))
  ]).pipe(
    filter(([{repoName}]) => !!repoName),
    switchMap(([{repoName}, {page}]) =>
      this.store.pipe(select(fromRepos.getUserName),
        filter(userName => (typeof userName === 'string' && !!userName)),
        tap((userName: any) => {
          this.store.dispatch(IssueActions.loadIssues({userName, repoName, page: page.toString()}))
        }),
        switchMap(() =>
          this.store.pipe(select(fromIssue.getIssues))
        )
      )
    )
  );


  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) { }


  ngOnInit(): void{
    this.title = this.route.snapshot.params.repoName
  }

  back(): void{
    this.store.dispatch(IssueActions.deleteIssues())
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.statusComponent = {page: this.statusComponent.page + 1};

      if(this.statusComponent.page >= total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
      }
      this.infiniteScroll$.next(this.statusComponent);
      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }


}
