import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollWrapperComponent } from './components/infinite-scroll-wrapper.component';
import { InfiniteScrollComponent } from './components/infinite-scroll.component';
import { NoDataComponent } from './components/no-data.component';
import { SpinnerComponent } from './components/spinner.component';

const COMPONENTS = [
  NoDataComponent,
  SpinnerComponent,
  InfiniteScrollWrapperComponent,
  InfiniteScrollComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class GenericsModule { }
