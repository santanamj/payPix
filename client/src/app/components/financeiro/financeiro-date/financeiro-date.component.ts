import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FinanceiroService } from '../../../services/financeiro.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
declare var jsPDF: any;
@Component({
  selector: 'app-financeiro-date',
  templateUrl: './financeiro-date.component.html',
  styleUrls: ['./financeiro-date.component.css']
})
export class FinanceiroDateComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  financeiros; 
  valorFinanceiro;  
  dataForm;
  buscaDate$= new Subject<any>();
  buscaDate;
  relatorio;
  printBusca = true;
  openBusca = true;
  financeirosData;  
  newValor: any[] = [];
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
    this.dataForm = formBuild.group({
      dataInit:['', Validators.required],
      dataEnd: ['', Validators.required]
    })
    
   }
   submit(){
    const dateInit = this.dataForm.get('dataInit').value;
    const dateEnd = this.dataForm.get('dataEnd').value;
    const dates = `dateInit=${dateInit}&dataEnd=${dateEnd}`
    this.buscaDate$.next(dates);
    this.financeiroService.searchData(this.buscaDate$).subscribe((data: any)=>{
     
     const dataUser = data;   
     if(data.message == "Usuário não autorizado"){
      this.message = "Usuário não autorizado";
      this.toastr.error('Usuário não autorizado para acessar a informação', 'false', {
        timeOut: 5000
      });
     }else{
      this.financeirosData = data; 
     const ValorMen = this.financeirosData.map((item)=> {return parseFloat(item.valor)});     
     
     this.valorFinanceiro = ValorMen.reduce((total, numero) => total + numero, 0)
      console.log(this.valorFinanceiro)
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

   doc.save('Relatorio-cobranca.pdf');
 }
  ngOnInit(): void {
  }

}
