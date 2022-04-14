import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { EntityStatus } from '@clrepos/shared/utils/utils/functions';

@Component({
  selector: 'app-infinite-scroll',
  template:`
    <ng-container *ngIf="page < total">
      <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
        <ion-infinite-scroll-content class="loadingspinner">
          <app-spinner [top]="'0%'" *ngIf="$any(status) === 'pending'"></app-spinner>
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ng-container>
  `,
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent {

  @Input() status: EntityStatus;
  @Input() total: number;
  @Input() page: number;
  @Output() loadDataTrigger = new EventEmitter<{event, total}>();


  constructor() { }


  loadData(event, total): void{
    this.loadDataTrigger.next({event, total})
  }

}
