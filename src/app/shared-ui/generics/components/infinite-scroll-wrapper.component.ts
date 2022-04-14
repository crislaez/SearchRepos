
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityStatus, errorImage, trackById } from '@clrepos/shared/utils/utils/functions';

@Component({
  selector: 'app-infinite-scroll-wrapper',
  template:`
    <ng-container *ngIf="from === 'subscribers'">
      <ion-card class="fade-in-card" *ngFor="let item of items; trackBy: trackById" >
        <img [src]="item?.avatar_url" (error)="errorImage($event)">
        <ion-card-header>
          <ion-card-title class="text-second-color capital-letter">{{item?.login }}</ion-card-title>
        </ion-card-header>

        <ion-card-content class="text-second-color">
          <div class="font-small margin-top-10"><a [href]="item?.html_url">{{'COMMON.SEE_IN_GITHUB' | translate}}</a></div>
        </ion-card-content>
      </ion-card>
    </ng-container>


    <ng-container *ngIf="from === 'tags'">
      <ion-card class="fade-in-card" *ngFor="let item of items; trackBy: trackById" >
        <ion-card-header>
          <ion-card-title class="text-second-color capital-letter font-big">{{ item?.name }}</ion-card-title>
        </ion-card-header>

        <ion-card-content class="text-second-color">
          <div class="displays-around margin-top font-small capital-letter">
            <div class="width-half margin-top-10">{{'COMMON.COMMIT' | translate}}:</div>
            <div class="width-half margin-top-10">{{item?.commit?.sha}}</div>
          </div>
        </ion-card-content>
      </ion-card>
    </ng-container>


    <!-- INFINITE SCROLL -->
    <app-infinite-scroll
      [status]="status"
      [total]="total"
      [page]="page"
      (loadDataTrigger)="loadDataTrigger.next($event)">
    </app-infinite-scroll>
  `,
  styleUrls: ['./infinite-scroll-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollWrapperComponent {

  errorImage = errorImage;
  trackById = trackById;
  @Input() status: EntityStatus;
  @Input() total: number;
  @Input() page: number;
  @Input() from: string;
  @Input() items: any[];
  @Output() loadDataTrigger = new EventEmitter<{event, total}>();


  constructor() { }

}
