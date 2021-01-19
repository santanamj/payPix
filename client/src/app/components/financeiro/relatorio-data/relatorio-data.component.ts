import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FinanceiroService } from '../../../services/financeiro.service';
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
declare var jsPDF: any;
@Component({
  selector: 'app-relatorio-data',
  templateUrl: './relatorio-data.component.html',
  styleUrls: ['./relatorio-data.component.css']
})
export class RelatorioDataComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  listCaixa;
  dataForm;
  buscaDate$= new Subject<any>();
  buscaDate;
  relatorio;
  printBusca = true;
  openBusca = true;
  totalValor;
  cartaoValor;
  valoresOutro;
  message;
  user;
  gerente;
  role;
  constructor(
    private authService: AuthService,
    private financeiroService: FinanceiroService,
    private formBuild: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.authService.getProfile().subscribe((data: any) => {
      if(data.success ==false){       
       this.router.navigate(['/login']);
      }
      this.user = data;    
      this.role = this.user.user.role;  
      console.log(this.role)    
    }) 
    this.dataForm = this.formBuild.group({
      dataCaixas: new FormArray([])     
     })  
    this.financeiroService.getCaixas().subscribe((data: any)=>{
      if(data.message == "Usuário não autorizado"){
        this.message = "Usuário não autorizado";
        this.toastr.error('Usuário não autorizado para acessar a informação', 'false', {
          timeOut: 5000
        });
       }else{
      this.listCaixa = data;
      console.log(this.listCaixa)
      this.listCaixa.forEach(() => {
        const control = new FormControl(); // if first item set to true, else false
        (this.dataForm.controls.dataCaixas as FormArray).push(control);
        
      });  
    }
    })
    this.submit();
   }
   changed(evt) {
    this.submit()
  }
   submit(){
    const selectedOrderIds = this.dataForm.value.dataCaixas
    .map((v, i) => v ? this.listCaixa[i].createdAt : null)
    .filter(v => v !== null);
    const selectData = JSON.stringify(selectedOrderIds)  
    console.log(selectData);
    this.buscaDate = `buscaDate=${selectData}`;
    this.buscaDate$.next(this.buscaDate);
    this.financeiroService.searchCaixa(this.buscaDate$).subscribe((data: any) => {
      if(data.message == "Usuário não autorizado"){
        this.message = "Usuário não autorizado";
        this.toastr.error('Usuário não autorizado para acessar a informação', 'false', {
          timeOut: 10000
        });
       }else{
      this.relatorio = data;
      this.totalValor = this.relatorio.map((item) => item.valor)
      .reduce((previous, current) => previous + current, 0);
       }
    })
   }
   public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a2');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('Relatorio.pdf');
  }
  ngOnInit(): void {
    
  }

}
