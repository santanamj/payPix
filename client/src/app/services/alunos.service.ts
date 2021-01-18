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
export class AlunosService {
  domain = environment.domain;
  authToken: any;
  user: any;
  options;
  currentUser = {};
 
  queryUrl: string = '?term=';
  queryTitle: string = '?matricula=';
  headers = new HttpHeaders().set('Content-Type', 'application/json'); 
  constructor(
    private http: HttpClient
  ) {  }
  
  newAluno(aluno:any){
    return this.http.post(this.domain + 'api/newAluno', aluno)
  }
  getAluno(id: any){
    return this.http.get(this.domain + 'api/getAluno/' + id );
  }
  getAlunos(){
    return this.http.get(this.domain + 'api/getAlunos');
  }
  getNuAlunos(){
    return this.http.get(this.domain + 'api/countAluno');
  }
  imgAluno( formData, id) {    
    return this.http.post(this.domain + 'api/imgAluno/' + id,  formData)
  }
  getSingleAluno(id) {
    // Create headers
   return this.http.get(this.domain + 'api/oneAluno/' + id)
 }
  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.alunoSearch(term));
  }  
  public alunoSearch(term){
    return this.http.get(this.domain + 'api/getAlunos' + this.queryUrl + term);
  }
  searchMatricula(matriculas: Observable<string>) {
    return matriculas.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(matricula => this.alunoMatricula(matricula));
  }
  public alunoMatricula(matricula){
    return this.http.get(this.domain + 'api/getMatriculaAlunos' + this.queryTitle + matricula);
  }
  public getAllAlunos(){
    return this.http.get(this.domain + 'api/getAllAlunos');
  }
  editAluno(aluno) {
    // Create headers
   return this.http.put(this.domain + 'api/updateAluno', aluno)
 }
 addressAluno(aluno){
  // Create headers
 return this.http.put(this.domain + 'api/addressAluno', aluno)
}
responsavelAluno(aluno){
  // Create headers
 return this.http.put(this.domain + 'api/responsavelAluno', aluno)
}
}
