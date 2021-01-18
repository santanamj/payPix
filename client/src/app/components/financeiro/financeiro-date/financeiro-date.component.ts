import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FinanceiroService } from '../../../services/financeiro.service';
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
  constructor(
    private financeiroService: FinanceiroService,
    private formBuild: FormBuilder
  ) {
    this.dataForm = formBuild.group({
      dataInit:['', Validators.required],
      dataEnd: ['', Validators.required]
    })
    this.financeiroService.getmensalidaMes().subscribe((data: any)=>{
      this.financeiros = data;
      
    });
   }
   submit(){
    const dateInit = this.dataForm.get('dataInit').value;
    const dateEnd = this.dataForm.get('dataEnd').value;
    const dates = `dateInit=${dateInit}&dataEnd=${dateEnd}`
    this.buscaDate$.next(dates);
    this.financeiroService.searchData(this.buscaDate$).subscribe((data)=>{
     this.financeirosData = data;
     console.log(this.financeirosData.pix)
     const ValorMen = this.financeirosData.map((item)=> {return item.valor});
     
     for(let i = 0; ValorMen.length > i; i++){
      this.newValor.push(parseFloat(ValorMen[i].original)); 
     
      console.log(this.newValor)   
     }
     this.valorFinanceiro = this.newValor.reduce((total, numero) => total + numero, 0)
      console.log(this.valorFinanceiro)
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

   doc.save('Relatorio-mensal.pdf');
 }
  ngOnInit(): void {
  }

}
