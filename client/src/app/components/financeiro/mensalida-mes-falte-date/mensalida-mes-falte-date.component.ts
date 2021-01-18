import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { FinanceiroService } from '../../../services/financeiro.service';
declare var jsPDF: any;

@Component({
  selector: 'app-mensalida-mes-falte-date',
  templateUrl: './mensalida-mes-falte-date.component.html',
  styleUrls: ['./mensalida-mes-falte-date.component.css']
})
export class MensalidaMesFalteDateComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  mensalidades; 
  valorMensalidade;  
  dataForm;
  buscaDate$= new Subject<any>();
  buscaDate;
  relatorio;
  printBusca = true;
  openBusca = true;
  mensalidadesData;
  nomeAluno;
  constructor(
    private financeiroService: FinanceiroService,
    private formBuild: FormBuilder
  ) {
    this.dataForm = formBuild.group({
      dataInit:[''],
      dataEnd: ['']
    })
    this.financeiroService.getmensalidaMes().subscribe((data: any)=>{
      this.mensalidades = data;
      
    });
   }
   submit(){
     const dateInit = this.dataForm.get('dataInit').value;
     const dateEnd = this.dataForm.get('dataEnd').value;
     const dates = `dateInit=${dateInit}&dataEnd=${dateEnd}`
     this.buscaDate$.next(dates);
     this.financeiroService.searchDataFalte(this.buscaDate$).subscribe((data: any)=>{
      this.mensalidadesData = data.mensalidade;
      this.nomeAluno = data.aluno.nome;
      const ValorMen = this.mensalidadesData.map((item)=> {return parseInt(item.vlrmen)})
      this.valorMensalidade = ValorMen.reduce((total, numero) => total + numero, 0)
      console.log(this.valorMensalidade)
     })
     console.log(dateInit)
  
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
