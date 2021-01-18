import { Component, OnInit } from '@angular/core';
import { FinanceiroService } from '../../../services/financeiro.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CurrencyPipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
@Component({
  selector: 'app-financeiro-detail',
  templateUrl: './financeiro-detail.component.html',
  styleUrls: ['./financeiro-detail.component.css']
})
export class FinanceiroDetailComponent implements OnInit {
  role;
  username;
  cobranca;
  qrCode;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  e2eId;
  devolucao;
  constructor(
    private financeiroService: FinanceiroService,   
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private _router: Router,   
    private currencyPipe : CurrencyPipe,
    private _location: Location,
    private toastr: ToastrService,
  ) {
    
    this.route.params.forEach((params: Params) => {
      let id = params['id'];  
      this.financeiroService.getCobrancaId(id).subscribe((response: any) => {
      this.cobranca = response;  
      this.qrCode = this.cobranca.qrcode;
      console.log(this.cobranca.dados)
      if(this.cobranca.dados.pix && this.cobranca.dados.pix[0].devolucoes[0]){        
        this.devolucao = '0';
      }else if(this.cobranca.dados.pix){
        this.e2eId = '1';
      }else{
        this.e2eId = '2'
      }
     
                       
  })
    });
   }
  Submit(){
    const dados = {
    t2id:  this.cobranca.dados.pix[0].endToEndId,
    valor: this.cobranca.dados.valor?.original,
    id:'1'
    }
    this.financeiroService.devolverCobranca(dados).subscribe((data: any)=>{
      console.log(data)
    })
  } 

  ngOnInit(): void {
  }

}
