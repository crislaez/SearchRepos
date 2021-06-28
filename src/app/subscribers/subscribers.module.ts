import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReposModule } from '../shared/repos/repos.module';
import { SubscriberModule } from '../shared/subscribers/subscribers.module';
import { SubscribersPage } from './containers/subscribers.page';
import { SubscribersPageRoutingModule } from './subscribers-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscribersPageRoutingModule,
    TranslateModule.forChild(),
    ReposModule,
    SubscriberModule
  ],
  declarations: [SubscribersPage]
})
export class SubscribersPageModule {}
