import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-root',
  template:`
  <ion-app >
   <!-- CABECERA  -->
   <ion-header no-border >
     <ion-toolbar mode="md|ios">
       <ion-button fill="clear" size="small" slot="start" (click)="open()">
         <!-- <ion-menu-button class="text-color"></ion-menu-button> -->
       </ion-button>
       <ion-title class="text-color" >{{'COMMON.TITLE' | translate}}</ion-title>
       <div size="small" slot="end">
       </div>
     </ion-toolbar>
   </ion-header>

   <!-- MENU LATERAL  -->
   <!-- <ion-menu side="start" menuId="first" contentId="main">
     <ion-header>
       <ion-toolbar >
         <ion-title class="text-color" >Menu</ion-title>
       </ion-toolbar>
     </ion-header>

     <ion-content *ngIf="(menu$ | async) as menu">
       <ion-item class="text-color" *ngFor="let item of menu" [routerLink]="['/genre/'+item?.id]" (click)="deleteMovieByIdGenre()">{{item?.name}}</ion-item>
     </ion-content >
   </ion-menu> -->

   <!-- RUTER  -->
   <ion-router-outlet id="main"></ion-router-outlet>

   <!-- TAB FOOTER  -->
   <!-- <ion-tabs >
     <ion-tab-bar  [translucent]="true" slot="bottom">
       <ion-tab-button class="text-color" [routerLink]="['home']">
         <ion-icon name="videocam-outline"></ion-icon>
       </ion-tab-button>

       <ion-tab-button class="text-color" [routerLink]="['tv']">
         <ion-icon name="tv-outline"></ion-icon>
       </ion-tab-button>

       <ion-tab-button class="text-color" [routerLink]="['search']">
         <ion-icon name="search-outline"></ion-icon>
       </ion-tab-button>

     </ion-tab-bar>
   </ion-tabs> -->

 </ion-app>
 `,
  styleUrls: ['./root.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {

  // menu$: Observable<Menu[]> = this.store.pipe(select(fronMovie.getMenu));


  constructor(private menu: MenuController, private router: Router, private store: Store) {
    // this.menu$.subscribe(data => console.log(data))
  }


  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  redirectTo(passage: string): void{
    this.router.navigate(['/chapter/'+passage])
    this.menu.close('first')
  }

  openEnd() {
    this.menu.close();
  }

  deleteMovieByIdGenre(): void{
    // this.store.dispatch(MovieActions.deleteMovieGenre())
    this.openEnd();
  }


}
