import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FinanceiroService } from '../../../services/financeiro.service';
import * as moment from 'moment';
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
  cobrancas: any[] = [];
  datas;
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
      this.cobrancas = data.cob;
      this.datas = this.cobrancas.map((item)=>{ return moment(item.pix.horario).format('YYYY-MM-DD')});
      console.log(this.datas)

    });
    
  }

  ngOnInit(): void {
  }

}
