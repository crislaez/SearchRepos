import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment, CommentActions, fromComment } from '@clrepos/shared/comment';
import { fromIssue } from '@clrepos/shared/issue';
import { fromRepos } from '@clrepos/shared/repos';
import { errorImage, trackById, gotToTop } from '@clrepos/shared/shared/utils/utils';
import { IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-comments',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="container components-color">

      <ng-container *ngIf="comment$ | async as comments">
        <ng-container *ngIf="!(pending$ | async) || page > 1; else loader">
          <ng-container *ngIf="comments?.length > 0 ; else noData">

            <div class="header" no-border>
              <ng-container *ngIf="(title$ | async) as title">
                <ion-back-button  (click)="back(title)" defaultHref=""  class="text-second-color" [text]="''"></ion-back-button>
                <h1 class="capital-letter">{{'COMMON.COMMENTS_TITLE' | translate}} {{title}}</h1>
                <div class="header-container-empty" ></div>
              </ng-container>
            </div>

            <ion-card class="fade-in-card" *ngFor="let comment of comments; trackBy: trackById" >
              <ion-card-header>
                <ion-card-title class="text-color capital-letter">{{comment?.user?.login }}</ion-card-title>
              </ion-card-header>

              <ion-card-content class="text-color">
                <div class="font-medium" *ngIf="comment?.body" [innerHTML]="comment?.body"></div>

                <div class="displays-around margin-top font-small capital-letter">
                  <div class="width-half margin-top-10">{{'COMMON.CREATE' | translate}}:</div>
                  <div class="width-half margin-top-10">{{comment?.created_at | date}}</div>

                  <div class="width-half margin-top-10">{{'COMMON.UPDATE' | translate}}:</div>
                  <div class="width-half margin-top-10">{{comment?.updated_at | date}}</div>
                </div>
                <div class="font-small margin-top-10"><a [href]="comment?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a></div>
              </ion-card-content>

              <!-- <ion-ripple-effect></ion-ripple-effect> -->
            </ion-card>

          </ng-container>
        </ng-container>
      </ng-container>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <div class="header" no-border>
          <ion-back-button defaultHref="../" class="text-second-color" [text]="''"></ion-back-button>
          <h1 class="capital-letter">{{'COMMON.NO_COMMENT_TITLE' | translate}}</h1>
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

  </ion-content >
  `,
  styleUrls: ['./comments.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsPage {

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  trackById = trackById;
  errorImage = errorImage;
  gotToTop = gotToTop;
  page: number = 1;
  showButton: boolean = false;

  infiniteScroll$ = new EventEmitter();
  pending$: Observable<boolean> = this.store.pipe(select(fromComment.getPending));
  title$: Observable<string> = this.store.pipe(select(fromIssue.getRepoName));

  comment$: Observable<Comment[]> = this.route.params.pipe(
    filter( ({issueNumber}) => !!issueNumber),
    switchMap( ({issueNumber}) =>
      this.store.pipe(select(fromIssue.getRepoName),
        switchMap( (repoName) =>
          this.store.pipe(select(fromRepos.getUserName),
            map(userName => {
              if(!userName && !repoName){
                this.router.navigate(['/search'])
                return EMPTY
              }
              return userName
            }),
            filter( (userName) => !!issueNumber && !!repoName),
            tap((userName: any) => this.store.dispatch(CommentActions.loadComments({userName, repoName, issueNumber})) ),
            switchMap(() => this.store.pipe(select(fromComment.getComments)))
          )
        )
      )
    )
  );


  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    // this.comment$.subscribe(data => console.log(data))
  }


  back(title: string): void{
    this.store.dispatch(CommentActions.deleteComments())
    this.router.navigate(['/issues/'+title])
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}
