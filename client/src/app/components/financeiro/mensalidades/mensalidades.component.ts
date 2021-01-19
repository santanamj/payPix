import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FinanceiroService } from '../../../services/financeiro.service';
import { CurrencyPipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
@Component({
  selector: 'app-mensalidades',
  templateUrl: './mensalidades.component.html',
  styleUrls: ['./mensalidades.component.css']
})
export class MensalidadesComponent implements OnInit { 
  nome;
  mensalidades;
  id;
  form: FormGroup;
  claimMoney;
  date;
  boletoDate;
  tipos; 
  financeiro;
  parcelas;
  aluno;
  messageClass;
  message;
  settime;
  processing;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrCode='00020126880014br.gov.bcb.pix2566qrcodes-pix.gerencianet.com.br/v2/1df114424330427593b68937fe2ba4bc52040000530398654040.205802BR5918MINHA EMPRESA LTDA6009RIO PRETO62070503***63041050';
  constructor(
    private financeiroService: FinanceiroService,
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private currencyPipe : CurrencyPipe,
    private _location: Location
  ) 
  { 
    this.claimMoney = '0,00';  
    this.form = this.formBuild.group({
      amount: [ this.formatMoney(this.claimMoney), Validators.required],
      nameClient: ['', Validators.required]    
  })  
    
  }
  formatMoney(value) {
    const temp = `${value}`.replace(",", ".");
    return temp;
}
transformTotal() {
  const value = this.form.controls.amount.value;
  this.form.controls.amount.setValue(
    this.formatMoney(value.replace(/\,/g, ".")), 
    {emitEvent: false}
  );
}
registroSubmit(){
  const mensalidade = {
    valor: this.form.get('amount').value,
    nameClient: this.form.get('nameClient').value
  }
  console.log(mensalidade)
  this.financeiroService.newMensalidade(mensalidade).subscribe((data: any)=>{
    if(!data){

    }else{  
      console.log(data) 
      this.qrCode = data.qrCode;

      this.form.reset();
      this.toastr.success('Pagamento criado com sucesso', 'ok',{
        timeOut: 3000
      });
    }
    
  })

}


  ngOnInit(){  
   
  }

}
