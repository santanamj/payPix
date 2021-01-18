import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FinanceiroService } from '../../../services/financeiro.service';

@Component({
  selector: 'app-dados-financas',
  templateUrl: './dados-financas.component.html',
  styleUrls: ['./dados-financas.component.css']
})
export class DadosFinancasComponent implements OnInit {
  mensalidades;
  faltaMensalidades;
  valorMensalidade;
  valorMensalidadeFalte;
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
    this.financeiroService.getCobrancas().subscribe((data: any)=>{
      this.cobrancas = data;
      console.log(this.cobrancas)
    });
    
  }

  ngOnInit(): void {
  }

}
