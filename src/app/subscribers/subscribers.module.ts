import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenericsModule } from '@clrepos/shared-ui/generics/generics.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SubscriberModule } from '../shared/subscribers/subscribers.module';
import { SubscribersPage } from './containers/subscribers.page';
import { SubscribersPageRoutingModule } from './subscribers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SubscriberModule,
    GenericsModule,
    TranslateModule.forChild(),
    SubscribersPageRoutingModule,
  ],
  declarations: [SubscribersPage]
})
export class SubscribersPageModule {}
