import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { CepService } from '../../../services/cep.service';
import { AlunosService } from '../../../services/alunos.service';
import { FormValidations } from '../../../services/form-validations';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-responsavel',
  templateUrl: './edit-responsavel.component.html',
  styleUrls: ['./edit-responsavel.component.css']
})
export class EditResponsavelComponent implements OnInit {
  aluno;
  form;
  endereco;
  messageClass;
  message;
  processing = false;
  bc;
  alunoId;
  nomeAluno;
  responsavel;
  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcpf = [  /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  constructor(
    private formBuild: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    private alunoService: AlunosService,
    private cepService: CepService,
    private toastr: ToastrService
  ) { 
    this.route.params.forEach((params: Params) => {
      let id = params['id'];  
      this.alunoId = id;
      this.alunoService.getSingleAluno(id).subscribe(
        response => {
            this.aluno = response; 
            this.responsavel = this.aluno.responsavel[0]; 
            console.log(this.responsavel)          
  })
    }); 
    this.form = this.formBuild.group({
      responsavel: this.formBuild.group({
        nome:[''],
        cpfResponsavel:[''],
        parentesco:[''],
        telefoneResponsavel:[''],
        celularResponsavel:['']
      })         
})
}
  registroSubmit(){
    const registerAluno = this.form.value;
    
    const aluno = {
      responsavel: registerAluno,
      _id: this.alunoId
    }
    console.log(aluno)
    this.alunoService.responsavelAluno(aluno).subscribe(data =>{
     if (!data) {
       this.messageClass = 'alert alert-danger'; // Return error class
       this.message = data; // Return error message
       this.processing = false; // Enable submit button       
     } else {
       this.messageClass = 'alert alert-success'; // Return success class
       this.message = data; // Return success message     
       // Clear form data after two seconds
       this.toastr.success('Responsável atualizado com sucesso!', 'ok',{
        timeOut: 3000
      });
      this.form.reset();      
      
     }
    })
  }
  ngOnInit(): void {
  }

}
