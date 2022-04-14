import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template:`
  <ion-app >
   <!-- CABECERA  -->
   <ion-header class="ion-no-border" >
     <ion-toolbar *ngIf="(currentSection$ | async) as currentSection">

        <ion-back-button *ngIf="!navItems?.includes(currentSection?.url)" class="text-color" slot="start" defaultHref="/search" [text]="''"></ion-back-button>

        <ion-title class="text-color" >{{ currentSection?.label | translate}}</ion-title>
     </ion-toolbar>
   </ion-header>

   <!-- RUTER  -->
   <ion-router-outlet id="main"></ion-router-outlet>
 </ion-app>
 `,
  styleUrls: ['./root.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {

  navItems = ['/search','/'];

  currentSection$: Observable<{url:string, label:string}> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {};
      const params =  (url?.split('/') || [])[1];
      const queryParams =  (url?.split('/') || [])[2];

      if(this.checkNavsParams(url)) return {url:`/${params}`, label:`${params}: ${queryParams}`};

      return {url:`/${params}`, label:'COMMON.TITLE'}
    })
  );


  constructor(
    private menu: MenuController,
    private router: Router
  ) { }


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
    this.openEnd();
  }

  checkNavsParams(url:string): boolean{
    return ['subscribers','tags','issues','comment']?.some(item => url?.includes(item))
  }


}
