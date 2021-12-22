import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromRepos } from '@clrepos/shared/repos';
import { fromTag, TagActions } from '@clrepos/shared/tag';
import { errorImage, gotToTop, trackById, sliceCharacter } from '@clrepos/shared/utils/utils/functions';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="container components-color-second">

      <ng-container *ngIf="(tags$ | async) as tags">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 1; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">

              <ng-container *ngIf="tags?.length > 0; else noData">

                <div class="header" no-border>
                  <ion-back-button (click)="back()" defaultHref="/search" class="text-second-color" [text]="''"></ion-back-button>
                  <h1 class="capital-letter text-second-color font-title">{{ title }}</h1>
                  <div class="header-container-empty" ></div>
                </div>

                <ion-card class="fade-in-card" *ngFor="let tag of tags; trackBy: trackById" >
                  <ion-card-header>
                    <ion-card-title class="text-second-color capital-letter font-big">{{ tag?.name }}</ion-card-title>
                  </ion-card-header>

                  <ion-card-content class="text-second-color">
                    <div class="displays-around margin-top font-small capital-letter">
                      <div class="width-half margin-top-10">{{'COMMON.COMMIT' | translate}}:</div>
                      <div class="width-half margin-top-10">{{tag?.commit?.sha}}</div>
                    </div>
                    <!-- <div class="font-small margin-top-10" *ngIf="tag?.comments > 0"><ion-button color="primary" class="font-small" (click)="saveCommentTotalPage(tag?.comments)" [routerLink]="['/comments/'+issue?.number]">{{'COMMON.SEE_COMMENTS' | translate}}</ion-button></div> -->
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
          <ion-back-button defaultHref="/search" class="text-second-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter text-second-color font-title">{{'COMMON.NO_TAGS_TITLE' | translate}}</h1>
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
          <h1 class="capital-letter text-second-color font-title">{{'COMMON.NO_TAGS_TITLE' | translate}}</h1>
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
  styleUrls: ['./tags.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsPage implements OnInit {

  trackById = trackById;
  errorImage = errorImage;
  gotToTop = gotToTop;
  sliceCharacter = sliceCharacter;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  title: string = ''
  page: number = 1;
  showButton: boolean = false;

  infiniteScroll$ = new EventEmitter<{page: number}>();
  status$ = this.store.pipe(select(fromTag.getStatus));
  totalPages$: Observable<number> = this.store.pipe(select(fromTag.getTotalPages));

  statusComponent: {page: number} = {
    page:1,
  };

  tags$ = combineLatest([
    this.route.params,
    this.infiniteScroll$.pipe(startWith(this.statusComponent))
  ]).pipe(
    withLatestFrom(
      this.store.pipe(select(fromRepos.getUserName))
    ),
    filter(([[{repoName}, {page}], userName]) => !!userName && !!repoName && !!page),
    tap(([[{repoName}, {page}], userName]) =>
      this.store.dispatch(TagActions.loadTags({userName, repoName, page:page.toString()}))
    ),
    switchMap(() =>
      this.store.pipe(select(fromTag.getTags))
    )
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void{
    this.title = this.route.snapshot.params.repoName
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.statusComponent = {page: this.statusComponent?.page + 1}

      if(this.statusComponent?.page >= total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true;
      }
      this.infiniteScroll$.next(this.statusComponent);
      event.target.complete();
    }, 500);
    this.content.scrollToBottom()
  }

  back(): void{
    this.store.dispatch(TagActions.deleteTags())
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }


}
