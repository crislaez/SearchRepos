import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TagModule } from '../shared/tag/tag.module';
import { TagsPage } from './containers/tags.page';
import { TagsPageRoutingModule } from './tags-routing.module';


@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    TagModule,
    TranslateModule.forChild(),
    TagsPageRoutingModule
  ],
  declarations: [TagsPage]
})
export class TagsPageModule {}
