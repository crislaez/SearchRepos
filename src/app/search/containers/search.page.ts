import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { fromRepos, ReposActions } from '@clrepos/shared/repos';
import { errorImage, gotToTop, trackById } from '@clrepos/shared/shared/utils/utils';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template:`
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container components-color-second">

          <!-- HEADER  -->
          <div class="header fade-in-card" no-border>
            <form class="form" (submit)="searchSubmit($event)">
              <ion-searchbar class="text-second-color"  [placeholder]="'COMMON.SEARCH' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
            </form>
          </div>

          <!-- status$ -->
          <ng-container *ngIf="(respos$ | async) as respos">
            <ng-container *ngIf="(status$ | async) as status">
              <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 1; else loader">
                <ng-container *ngIf="status !== 'error'; else serverError">

                  <ng-container *ngIf="statusComponent?.formName; else searchMessage">
                    <ng-container *ngIf="respos?.length > 0 ; else noData">

                      <ion-card *ngIf="getUserInfo(respos) as user" >
                        <img [src]="user?.avatar_url" (error)="errorImage($event)">
                        <ion-card-header>
                          <ion-card-title class="text-second-color">{{user?.login }}</ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="text-second-color">
                          <a [href]="user?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a>
                        </ion-card-content>
                      </ion-card>

                      <ion-card *ngFor="let repo of respos; trackBy: trackById" >
                        <ion-card-header>
                          <ion-card-title class="text-second-color">{{repo?.name }}</ion-card-title>
                        </ion-card-header>

                        <ion-card-content class="text-second-color">
                          <div class="font-medium margin-top-10" [innerHTML]="repo?.description"></div>

                          <div class="displays-around margin-top-10">
                            <div class="width-half capital-letter font-small margin-top-10">{{'COMMON.LANGUAJE' | translate}}:</div>
                            <div class="width-half capital-letter font-small margin-top-10">
                              <ng-container *ngIf="repo?.language; else noLanguage">{{repo?.language}}</ng-container>
                              <ng-template #noLanguage> - </ng-template>
                            </div>

                            <div class="width-half capital-letter font-small margin-top-10">{{'COMMON.OPEN_ISSUES' | translate}}:</div>
                            <div class="width-half capital-letter font-small margin-top-10">{{repo?.open_issues}}</div>

                            <div class="width-half capital-letter font-small margin-top-10">{{'COMMON.CREATE' | translate}}:</div>
                            <div class="width-half capital-letter font-small margin-top-10">{{repo?.created_at  | date}}</div>

                            <div class="width-half capital-letter font-small margin-top-10">{{'COMMON.UPDATE' | translate}}:</div>
                            <div class="width-half capital-letter font-small margin-top-10">{{repo?.updated_at | date}}</div>

                            <div class="width-half capital-letter font-small margin-top-10">{{'COMMON.PUSHED' | translate}}:</div>
                            <div class="width-half capital-letter font-small margin-top-10">{{repo?.pushed_at | date}}</div>

                            <div class="width-half capital-letter font-small margin-top-10">{{'COMMON.LICENCE' | translate}}:</div>
                            <div class="width-half capital-letter font-small margin-top-10">
                              <ng-container *ngIf="repo?.license?.name; else noLicence">{{repo?.license?.name}}</ng-container>
                              <ng-template #noLicence> - </ng-template>
                            </div>

                            <div class="width-half capital-letter font-small margin-top-10">{{'COMMON.PRIVATE' | translate}}:</div>
                            <div class="width-half capital-letter font-small margin-top-10">
                              <ng-container *ngIf="repo?.private; else noPrivate">{{'COMMON.YES' | translate}}</ng-container>
                              <ng-template #noPrivate>{{'COMMON.NO' | translate}}</ng-template>
                            </div>
                          </div>

                          <div class="font-small margin-top-10"><a [href]="repo?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a></div>
                          <div class="font-small margin-top-10" *ngIf="repo?.open_issues > 0"><ion-button class="font-small back-color" [routerLink]="['/issues/'+repo?.name]">{{'COMMON.SEE_ISSUES' | translate}}</ion-button></div>
                          <div class="font-small margin-top-10"><ion-button class="font-small back-color" [routerLink]="['/tags/'+repo?.name]">{{'COMMON.TAGS' | translate}}</ion-button></div>
                          <div class="font-small margin-top-10"><ion-button class="font-small back-color" [routerLink]="['/subscribers/'+repo?.name]">{{'COMMON.SUNBSCRIBERS' | translate}}</ion-button></div>

                        </ion-card-content>
                        <!-- <ion-ripple-effect></ion-ripple-effect> -->
                      </ion-card>

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
          </ng-container>

           <!-- REFRESH -->
          <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>

          <!-- MESSAGE -->
          <ng-template #searchMessage>
            <div class="error-serve fade-in-card">
              <span class="text-second-color">{{'COMMON.SEARCH_MESSAGE' | translate}}</span>
            </div>
          </ng-template>

          <!-- IS ERROR -->
          <ng-template #serverError>
            <div class="error-serve">
              <div>
                <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
                <br>
                <span class="text-second-color">{{'COMMON.ERROR' | translate}}</span>
              </div>
            </div>
          </ng-template>

          <!-- IS NO DATA  -->
          <ng-template #noData>
            <div class="error-serve">
              <span class="text-second-color">{{'COMMON.NORESULT' | translate}}</span>
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
  styleUrls: ['./search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage {

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  trackById = trackById;
  errorImage = errorImage;
  gotToTop = gotToTop;

  search = new FormControl('');
  showButton: boolean = false;

  statusComponent: {page: number, formName: string} = {
    page:1,
    formName:''
  };

  infiniteScroll$ = new EventEmitter<{page: number, formName: string}>();
  status$ = this.store.pipe(select(fromRepos.getStatus));
  totalPages$ = this.store.pipe(select(fromRepos.getTotalPages));

  respos$ = this.infiniteScroll$.pipe(
    startWith(this.statusComponent),
    tap(({formName, page}) => {
      if(!!formName) this.store.dispatch(ReposActions.loadRepos({name:formName, page:page.toString()}))
    }),
    switchMap(() =>
      this.store.pipe(select(fromRepos.getRepos))
    )
    // ,tap(subs => console.log({subs}))
  );


  constructor(
    private store: Store,
    public platform: Platform
  ) { }


  //FORMULARIO
  searchSubmit(event: Event): void{
    event.preventDefault();
    this.store.dispatch(ReposActions.deleteRepos());
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.statusComponent = { formName:this.search.value, page:1 };
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.statusComponent = {formName:'', page:1 };
    this.infiniteScroll$.next(this.statusComponent);
    this.store.dispatch(ReposActions.deleteRepos());
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.statusComponent = {...this.statusComponent, page: this.statusComponent.page + 1};

      if(this.statusComponent.page >= total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
      }
      this.infiniteScroll$.next(this.statusComponent);

      event.target.complete();
    }, 500);
  }

  // REFRES
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.statusComponent = {formName:'', page:1}
      this.infiniteScroll$.next(this.statusComponent);
      this.store.dispatch(ReposActions.deleteRepos());

      event.target.complete();
    }, 500);
  }

  getUserInfo(data: any): any{
    return data?.length > 0 && !!data?.[0]?.owner ? data?.[0]?.owner : {}
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }


}
