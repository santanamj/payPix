import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FinanceiroService } from '../../../services/financeiro.service';
@Component({
  selector: 'app-pendentes',
  templateUrl: './pendentes.component.html',
  styleUrls: ['./pendentes.component.css']
})
export class PendentesComponent implements OnInit { 
  data;
  user;
  gestor;
  cobrancas; 
  constructor(
    private financeiroService: FinanceiroService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getProfile().subscribe((data: any) => {
      if(data.success ==false){       
       this.router.navigate(['/login']);
      }
      this.user = data;    
      this.gestor = this.user.user.role;      
    }) 
    this.financeiroService.getPendenteCob().subscribe((data: any)=>{
      this.cobrancas = data.cob;
      console.log(this.cobrancas)
    });
   }

  ngOnInit(): void {
  }

}
