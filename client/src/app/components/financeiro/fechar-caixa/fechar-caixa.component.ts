import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FinanceiroService } from '../../../services/financeiro.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-fechar-caixa',
  templateUrl: './fechar-caixa.component.html',
  styleUrls: ['./fechar-caixa.component.css']
})
export class FecharCaixaComponent implements OnInit {
  data;
  user;
  gestor;
  cobrancas;
  valorFinanceiro;
  caixa;
  constructor(
    private financeiroService: FinanceiroService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.authService.getProfile().subscribe((data: any) => {
      if (data.success == false) {
        this.router.navigate(['/login']);
      }
      this.user = data;
      this.gestor = this.user.user.role;
    })
    this.financeiroService.fecharCaixa().subscribe((data: any) => {
      this.cobrancas = data.pix;
      const ValorMen = this.cobrancas.map((item) => { return parseFloat(item.valor) });
      this.valorFinanceiro = ValorMen.reduce((total, numero) => total + numero, 0);
      console.log(this.valorFinanceiro)
    });
  }
  submit() {
    const today = new Date()
    const caixa = {
      valor: this.valorFinanceiro,
      data: moment(today).format('YYYY-MM-DD')
    }
    this.financeiroService.closeCaixa(caixa).subscribe((data: any) => {
      if (!data.success) {
        this.toastr.error('Não foi possível fechar o caixa', 'false', {
          timeOut: 3000
        });
      } else {
        this.caixa = data;
        this.toastr.success('Caixa fechado com sucesso', 'ok', {
          timeOut: 3000
        });
      }

    })
  }
  ngOnInit(): void {
  }

}
