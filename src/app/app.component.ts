import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatSidenavModule, MatToolbarModule, MatIconModule, 
    MatListModule, MatButton, MatTooltip, MatMenuModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('hamburguerX', [
      /*
        state hamburguer => is the regular 3 lines style.
        states topX, hide, and bottomX => used to style the X element
      */
      state('hamburguer', style({})),
      // style top bar to create the X
      state(
        'topX',
        style({
          // transform: 'rotate(45deg)',
          // transformOrigin: 'left',
          // margin: '5px',
          transform: 'rotate(45deg) translate(4px, 6px)'
        })
      ),
      // hides element when create the X (used in the middle bar)
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      // style bottom bar to create the X
      state(
        'bottomX',
        style({
          // transform: 'rotate(-45deg)',
          // transformOrigin: 'left',
          // margin: '5px',
          transform: 'rotate(-45deg) translate(4px, -6px)'
        })
      ),
      transition('* => *', [
        animate('0.1s'), // controls animation speed
      ]),
    ]),
  ],
})
export class AppComponent {
  title: string = 'intelliV';
  opened: boolean = false ;
  isHamburguer: boolean = true;

  models: { name: string, label: string }[] = [
    { name: 'ml', label: 'ML-0.2.1' },
    { name: 'dl', label: 'DL-0.31' },
  ];

  selected_model:any = this.models[0];

  homeLink = "visited";
  settingsLink = "unvisited";
  aboutLink = "unvisited";

  homeIcon = "material-icons-round visited";
  settingsIcon = "material-icons-round unvisited";
  aboutIcon = "material-icons-round unvisited";


  onClick(event?:any) {
    let id; 
    if(event){
      id = event.target.id;
    } else{
      id = 'home';
    }
    switch(id){
      case 'home':
        this.homeLink = "visited";
        this.settingsLink = "unvisited";
        this.aboutLink = "unvisited";

        this.homeIcon = "material-icons-round visited";
        this.settingsIcon = "material-icons-round unvisited";
        this.aboutIcon = "material-icons-round unvisited";

        break;
      case 'settings':
        this.homeLink = "unvisited";
        this.settingsLink = "visited";
        this.aboutLink = "unvisited";

        this.homeIcon = "material-icons-round unvisited";
        this.settingsIcon = "material-icons-round visited";
        this.aboutIcon = "material-icons-round unvisited";
        break;

      case 'about':
        this.homeLink = "unvisited";
        this.settingsLink = "unvisited";
        this.aboutLink = "visited";

        this.homeIcon = "material-icons-round unvisited";
        this.settingsIcon = "material-icons-round unvisited";
        this.aboutIcon = "material-icons-round visited";
        break;
    }
  }

  toggle(event?:any){
    this.opened = !this.opened;
    this.isHamburguer = !this.isHamburguer;
  }

  onModelSelection(model:any): void {
    this.selected_model = model ;
  }
}
