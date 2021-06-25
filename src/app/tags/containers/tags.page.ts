import { Component, ChangeDetectionStrategy, ViewChild, EventEmitter } from '@angular/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { fromTag, Tag, TagActions } from '@clrepos/shared/tag';
import { trackById, errorImage } from '@clrepos/shared/shared/utils/utils';
import { fromRepos } from '@clrepos/shared/repos';

@Component({
  selector: 'app-tags',
  template: `
  <ion-content [fullscreen]="true">
    <div class="container components-color">

    <ng-container *ngIf="(tags$ | async) as tags">
      <ng-container *ngIf="!(pending$ |async); else loader">
        <ng-container *ngIf="tags?.length > 0; else noData">

          <div class="header" no-border>
              <ion-back-button (click)="back()" defaultHref="/search" class="text-second-color" [text]="''"></ion-back-button>
              <h1 class="capital-letter">{{'COMMON.ISSUE_TITLE' | translate}}</h1>
              <div class="header-container-empty" ></div>
            </div>

            <ion-card class="ion-activatable ripple-parent fade-in-card" *ngFor="let tag of tags; trackBy: trackById" >
              <ion-card-header>
                <ion-card-title class="text-color capital-letter">{{tag?.name }}</ion-card-title>
              </ion-card-header>

              <ion-card-content class="text-color">
                <div class="displays-around margin-top font-small capital-letter">
                  <div class="width-half margin-top-10">{{'COMMON.COMMIT' | translate}}:</div>
                  <div class="width-half margin-top-10">{{tag?.commit?.sha}}</div>
                </div>
                <!-- <div class="font-small margin-top-10" *ngIf="tag?.comments > 0"><ion-button color="primary" class="font-small" (click)="saveCommentTotalPage(tag?.comments)" [routerLink]="['/comments/'+issue?.number]">{{'COMMON.SEE_COMMENTS' | translate}}</ion-button></div> -->
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

     <!-- IS NO DATA  -->
     <ng-template #noData>
        <div class="header" no-border>
          <ion-back-button defaultHref="/search" class="text-second-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter">{{'COMMON.NO_TAGS' | translate}}</h1>
          <div class="header-container-empty" ></div>
        </div>
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
  styleUrls: ['./tags.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsPage {

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  trackById = trackById;
  errorImage = errorImage;

  page: number = 1;

  infiniteScroll$ = new EventEmitter();
  pending$: Observable<boolean> = this.store.pipe(select(fromTag.getPending));
  totalPages$: Observable<number> = this.store.pipe(select(fromTag.getTotalPages));

  tags$: Observable<Tag[]> = combineLatest([
    this.route.params,
    this.infiniteScroll$.pipe(startWith(1))
  ]).pipe(
    filter( ([{repoName}, page]) => !!repoName),
    switchMap(([{repoName}, page]) =>
      this.store.pipe(select(fromRepos.getUserName),
        map((userName) => {
          if(!userName){
            this.router.navigate(['/search'])
            return EMPTY
          }
          return userName
        }),
        tap((userName: any) => this.store.dispatch(TagActions.loadTags({userName, repoName, page:page.toString()}))),
        switchMap(() =>
          this.store.pipe(select(fromTag.getTags))
        )
      )
    )
  );


  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    //  this.tags$.subscribe(data => console.log(data))
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

  back(): void{
    this.store.dispatch(TagActions.deleteTags())
  }
}
