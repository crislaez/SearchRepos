import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment, CommentActions, fromComment } from '@clrepos/shared/comment';
import { fromIssue } from '@clrepos/shared/issue';
import { fromRepos } from '@clrepos/shared/repos';
import { errorImage, gotToTop, trackById } from '@clrepos/shared/utils/utils/functions';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="empty-header components-color-primary">
    </div>

    <div class="container components-color-second">
      <ng-container *ngIf="comment$ | async as comments">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">

              <ng-container *ngIf="comments?.length > 0 ; else noData">
                <ion-card class="fade-in-card" *ngFor="let comment of comments; trackBy: trackById" >
                  <ion-card-header>
                    <ion-card-title class="text-second-color capital-letter font-big">{{comment?.user?.login }}</ion-card-title>
                  </ion-card-header>

                  <ion-card-content class="text-second-color">
                    <div class="font-medium" *ngIf="comment?.body" [innerHTML]="comment?.body"></div>

                    <div class="displays-around margin-top font-small capital-letter">
                      <div class="width-half margin-top-10">{{'COMMON.CREATE' | translate}}:</div>
                      <div class="width-half margin-top-10">{{comment?.created_at | date}}</div>

                      <div class="width-half margin-top-10">{{'COMMON.UPDATE' | translate}}:</div>
                      <div class="width-half margin-top-10">{{comment?.updated_at | date}}</div>
                    </div>
                    <div class="font-small margin-top-10"><a [href]="comment?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a></div>
                  </ion-card-content>
                </ion-card>

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
  styleUrls: ['./comments.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsPage {

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  trackById = trackById;
  errorImage = errorImage;
  gotToTop = gotToTop;

  showButton: boolean = false;

  status$ = this.store.pipe(select(fromComment.getStatus));
  title$: Observable<string> = this.store.pipe(select(fromIssue.getRepoName));

  comment$: Observable<Comment[]> = this.route.params.pipe(
    withLatestFrom(
      this.store.pipe(select(fromRepos.getUserName)),
      this.store.pipe(select(fromIssue.getRepoName))
    ),
    filter(([{issueNumber}, userName, repoName]) => !!issueNumber && !!repoName && !!userName),
    tap(([{issueNumber}, userName, repoName]) =>
      this.store.dispatch(CommentActions.loadComments({userName, repoName, issueNumber}))
    ),
    switchMap(() =>
      this.store.pipe(select(fromComment.getComments))
    )
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) { }


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
