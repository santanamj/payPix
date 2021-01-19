import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
import 'rxjs/operator/filter';
@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  domain = environment.domain;
  authToken: any;
  user: any;
  options;
  currentUser = {};
  alunoMatricula;
  queryUrl: string = '?';
  queryTitle: string = '?titulo=';
  headers = new HttpHeaders().set('Content-Type', 'application/json'); 
  constructor(
    private http: HttpClient
  ) { }
  getCobrancas(){
    return this.http.get(this.domain + 'api/getAllPix')
  } 
  getPendenteCob(){
    return this.http.get(this.domain + 'api/getPendenteCob')
  }
  getCobrancaId(id)  {
    return this.http.get(this.domain + 'api/getCobrancaId/'+ id)
  }
  fecharCaixa(){
    return this.http.get(this.domain + 'api/fecharCaixa');
  }
  devolverCobranca(dados){
    return this.http.put(this.domain + 'api/cancelarCobranca', dados)
  }
  newMensalidade(financeiro) {
    // Create headers
   return this.http.post(this.domain + 'api/gerarToken', financeiro)
 }
 closeCaixa(caixa){
  return this.http.post(this.domain + 'api/closeCaixa', caixa)
 }
 getSingleAluno(id) {
  // Create headers
 return this.http.get(this.domain + 'api/oneAluno/' + id, this.options)
}
  getoneMensalidade(id) {
    // Create headers
   return this.http.get(this.domain + 'api/oneAlunoMensalidade/' + id)
 }
 oneAlunoMensalidadeList(id) {
  // Create headers
 return this.http.get(this.domain + 'api/oneAlunoMensalidadeList/' + id)
}
getCaixas(){
  return this.http.get(this.domain + 'api/getCaixas');
}
searchCaixa(buscarDates: Observable<string>) {
  return buscarDates.debounceTime(400)
    .distinctUntilChanged()
    .switchMap(buscarCredito => this.buscaDateCaixa(buscarCredito));
}
buscaDateCaixa(buscarCredito:any) {
  // Create headers
 return this.http.get(this.domain + 'api/searchgetCaixasDate' + this.queryUrl + buscarCredito)
}

searchData(buscarDates: Observable<string>) {
  return buscarDates.debounceTime(400)
    .distinctUntilChanged()
    .switchMap(buscarCaixa => this.buscaDateBoleto(buscarCaixa));
}
buscaDateBoleto(buscarCaixa:any) {
  // Create headers
 return this.http.get(this.domain + 'api/getpixdate' + this.queryUrl + buscarCaixa)
}
searchDataFalte(buscarDates: Observable<string>) {
  return buscarDates.debounceTime(400)
    .distinctUntilChanged()
    .switchMap(buscarCaixa => this.buscaDateFalte(buscarCaixa));
}
buscaDateFalte(buscarCaixa:any) {
  // Create headers
 return this.http.get(this.domain + 'api/mensalidaDaysFalte' + this.queryUrl + buscarCaixa)
}
searchMensalidadeAluno(buscarBoletos: Observable<string>) {
  return buscarBoletos.debounceTime(400)
    .distinctUntilChanged()
    .switchMap(buscarBoleto => this.buscaDateMensalidadeAluno(buscarBoleto));
}
buscaDateMensalidadeAluno(buscarBoleto:any) {
  // Create headers
 return this.http.get(this.domain + 'api/oneDataAlunoMensalidade' + this.queryUrl + buscarBoleto)
}
 editMensalidade(mensalidade) {
  console.log(mensalidade)
  return this.http.put(this.domain + 'api/updateMensalidade', mensalidade)
}
}
