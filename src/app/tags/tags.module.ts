import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReposModule } from '../shared/repos/repos.module';
import { TagModule } from '../shared/tag/tag.module';
import { TagsPage } from './containers/tags.page';
import { TagsPageRoutingModule } from './tags-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsPageRoutingModule,
    TranslateModule.forChild(),
    ReposModule,
    TagModule
  ],
  declarations: [TagsPage]
})
export class TagsPageModule {}
