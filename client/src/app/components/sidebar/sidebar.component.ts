import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/aluno/lista-alunos', title: 'Alunos',  icon:'users_single-02', class:''},
    { path: '/financeiro/financas', title: 'Financeiro',  icon:'shopping_credit-card', class:''},
    // {path: '/login',         title: 'Login',             icon:'objects_key-25',  class: ''},
    // { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' }
 ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  data;
  clickEventsubscription:Subscription;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.clickEventsubscription=    this.authService.getClickEvent().subscribe(()=>{
    
      })
    
   }
   getNew(){
    this.authService.getProfile().subscribe((data: any) => {
      if(data.success ==false){     
       this.router.navigate(['/login']);
      }
      this.data = data.success;     
    })
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  sair(){
    this.authService.logout();
    this.getNew();
    this.router.navigate(['/login']);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
