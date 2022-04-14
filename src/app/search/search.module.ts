import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericsModule } from '@clrepos/shared-ui/generics/generics.module';
import { SharedModule } from '@clrepos/shared/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReposModule } from '../shared/repos/repos.module';
import { SearchPage } from './containers/search.page';
import { SearchPageRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReposModule,
    GenericsModule,
    TranslateModule.forChild(),
    SearchPageRoutingModule,
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
