import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromIssue, Issue, IssueActions } from '@clrepos/shared/issue';
import { fromRepos } from '@clrepos/shared/repos';
import { errorImage, gotToTop, trackById } from '@clrepos/shared/utils/utils/functions';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-issues',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="empty-header components-color-primary">
    </div>

    <div class="container components-color-second">

      <ng-container *ngIf="(issues$ | async) as isssues">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 1; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">

              <ng-container *ngIf="isssues?.length > 0 ; else noData">
                <ion-card class="fade-in-card" *ngFor="let issue of isssues; trackBy: trackById" >
                  <ion-card-header>
                    <ion-card-title class="text-second-color capital-letter font-big">{{issue?.title }}</ion-card-title>
                  </ion-card-header>

                  <ion-card-content class="text-second-color">
                    <div class="font-medium" *ngIf="issue?.body" [innerHTML]="issue?.body"></div>
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

                </ion-card>

                <!-- INFINITE SCROLL  -->
                <app-infinite-scroll
                  *ngIf="(totalPages$ | async) as total"
                  [status]="status"
                  [total]="total"
                  [page]="statusComponent?.page"
                  (loadDataTrigger)="loadData($event)">
                </app-infinite-scroll>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'10vh'"></app-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'10vh'"></app-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <app-spinner [top]="'80%'"></app-spinner>
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
    withLatestFrom(
      this.store.pipe(select(fromRepos.getUserName))
    ),
    filter(([[{repoName}, {page}], userName]) => !!userName && !!repoName && !!page),
    tap(([[{repoName}, {page}], userName]) =>
      this.store.dispatch(IssueActions.loadIssues({userName, repoName, page: page.toString()}))
    ),
    switchMap(() =>
      this.store.pipe(select(fromIssue.getIssues))
    )
  );


  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }


  ngOnInit(): void{
    this.title = this.route.snapshot.params.repoName
  }

  back(): void{
    this.store.dispatch(IssueActions.deleteIssues())
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    this.statusComponent = {page: this.statusComponent.page + 1};

    if(this.statusComponent.page >= total){
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
    }
    this.infiniteScroll$.next(this.statusComponent);
    event.target.complete();
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }


}
