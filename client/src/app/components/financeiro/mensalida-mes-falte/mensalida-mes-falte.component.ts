import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FinanceiroService } from '../../../services/financeiro.service';
declare var jsPDF: any;
@Component({
  selector: 'app-mensalida-mes-falte',
  templateUrl: './mensalida-mes-falte.component.html',
  styleUrls: ['./mensalida-mes-falte.component.css']
})
export class MensalidaMesFalteComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  mensalidades; 
  valorMensalidade;  

  constructor(
    private financeiroService: FinanceiroService
  ) {
    this.financeiroService.getmensalidaMesFalte().subscribe((data: any)=>{
      this.mensalidades = data;
      const ValorMen = this.mensalidades.map((item)=> {return parseInt(item.vlrmen)})
      this.valorMensalidade = ValorMen.reduce((total, numero) => total + numero, 0)
      console.log(this.valorMensalidade)
    });
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
