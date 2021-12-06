import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SubscriberModule } from '../shared/subscribers/subscribers.module';
import { SubscribersPage } from './containers/subscribers.page';
import { SubscribersPageRoutingModule } from './subscribers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    SubscriberModule,
    TranslateModule.forChild(),
    SubscribersPageRoutingModule,
  ],
  declarations: [SubscribersPage]
})
export class SubscribersPageModule {}
