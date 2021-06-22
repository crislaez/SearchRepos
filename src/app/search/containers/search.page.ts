import { Component, ChangeDetectionStrategy, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, from, Observable } from 'rxjs';
import { filter, startWith, tap, switchMap, shareReplay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { ReposActions, fromRepos, Repo } from '@clrepos/shared/repos';
import { trackById, errorImage } from '@clrepos/shared/shared/utils/utils';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-search',
  template:`
    <ion-content [fullscreen]="true">
      <div class="container components-color">

          <!-- HEADER  -->
          <div class="header fade-in-card" no-border>
            <form class="form" (submit)="searchSubmit($event)">
              <ion-searchbar color="light" [placeholder]="'COMMON.SEARCH' | translate" [formControl]="search"></ion-searchbar>
            </form>
          </div>

          <ng-container *ngIf="(respos$ | async) as respos ; else searchMessage">
            <ng-container *ngIf="!(pending$ | async); else loader">
              <ng-container *ngIf="showFormresult; else searchMessage">
                <ng-container *ngIf="respos?.length > 0 ; else noData">

                  <ion-card *ngIf="getUserInfo(respos) as user" class="ion-activatable ripple-parent fade-in-card width-90">
                      <img [src]="user?.avatar_url" (error)="errorImage($event)">
                    <ion-card-header>
                      <ion-card-title class="text-color">{{user?.login }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content class="text-color">
                      <a [href]="user?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a>
                    </ion-card-content>
                  </ion-card>

                  <ion-card class="ion-activatable ripple-parent fade-in-card" *ngFor="let repo of respos; trackBy: trackById" >
                    <ion-card-header>
                      <ion-card-title class="text-color">{{repo?.name }}</ion-card-title>
                    </ion-card-header>

                    <ion-card-content class="text-color">
                      <div class="displays-around margin-top">
                        <div class="width-half capital-letter font-small">{{'COMMON.LANGUAJE' | translate}}:</div>
                        <div class="width-half capital-letter font-small">{{repo?.language}}</div>
                      </div>
                      <div ><a class="font-small" [href]="repo?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a></div>
                      <div ><a class="font-small" [routerLink]="['/issues/'+repo?.name]">{{'COMMON.SEE_ISSUES' | translate}}</a></div>

                    </ion-card-content>
                    <ion-ripple-effect></ion-ripple-effect>
                  </ion-card>

                  <ng-container *ngIf="(totalPages$ | async) as total">
                    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
                      <ion-infinite-scroll-content loadingSpinner="crescent" color="primary">
                      </ion-infinite-scroll-content>
                    </ion-infinite-scroll>
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

          <!-- IS NO DATA  -->
          <ng-template #noData>
            <div class="error-serve">
              <span class="text-second-color">{{'COMMON.NORESULT' | translate}}</span>
            </div>
          </ng-template>

          <!-- LOADER  -->
          <ng-template #loader>
            <ion-spinner color="primary"></ion-spinner>
          </ng-template>

      </div>
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

  showFormresult:boolean = false;
  search = new FormControl('');
  page: number = 1;

  formResult$ = new EventEmitter();
  infiniteScroll$ = new EventEmitter();
  pending$: Observable<boolean> = this.store.pipe(select(fromRepos.getPending));
  totalPages$: Observable<number> = this.store.pipe(select(fromRepos.getTotalPages));

  respos$: Observable<Repo[]> = combineLatest([
    this.formResult$.pipe(startWith('')),
    this.infiniteScroll$.pipe(startWith(1))
  ]).pipe(
    filter(([name, page]) => !!name),
    tap(([name, page]) => this.store.dispatch(ReposActions.loadRepos({name, page:page.toString()})) ),
    switchMap(() =>
      this.store.pipe(select(fromRepos.getRepos))
    ),
    shareReplay(1)
  );


  constructor(private store: Store) {
    // this.respos$.subscribe(data => console.log(data))
   }


  //FORMULARIO
  searchSubmit(event: Event): void{
    event.preventDefault();
    this.store.dispatch(ReposActions.deleteRepos());
    this.infiniteScroll$.next(1);
    this.page = 1
    this.formResult$.next(this.search.value);
    this.showFormresult = true
  }

  // REFRES
  doRefresh(event) {
    setTimeout(() => {
      this.store.dispatch(ReposActions.deleteRepos());
      this.formResult$.next('');
      this.infiniteScroll$.next(1);
      this.page = 1
      this.showFormresult = false
      this.search.reset()
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.page = this.page + 1;
      if(this.page > total){
        this.ionInfiniteScroll.disabled = true
        return
      }
      this.infiniteScroll$.next(this.page)
      event.target.complete();
    }, 500);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  getUserInfo(data: any): any{
    return data?.length > 0 && !!data?.[0]?.owner ? data?.[0]?.owner : {}
  }


}
