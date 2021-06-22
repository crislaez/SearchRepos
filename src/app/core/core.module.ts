import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RootComponent } from './containers/root.page';
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    RootComponent
  ],
  providers: [
    { provide: "windowObject", useValue: window}
  ]
})
export class CoreModule {}
