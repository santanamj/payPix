import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ObservacaoService {
  options;  
  domain = environment.domain;  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
  
    private http: HttpClient,
    private toastr: ToastrService
  ) {} 

   // Function to create a new address post
   newObservacao(observacao) {
     // Create headers
    return this.http.post(this.domain + 'api/newObservacao', observacao)
  }
  // Function to get all addresses from the database
  getAllObservacoes(id) {
     // Create headers
    return this.http.get(this.domain + 'api/getObservacoes/' + id)
  }   
  getSingleObservacao(id) {
     // Create headers
    return this.http.get(this.domain + 'api/oneObservacao/' + id)
  }
 
  editObservacao(obs) {   
    return this.http.put(this.domain + 'api/editObservacao', obs)
  }
  deleteObservacao(id:any) {   
    return this.http.delete(this.domain + 'api/deleteObs/' + id)
      
  }
}
