import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlunosService } from '../../../services/alunos.service';
@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.component.html',
  styleUrls: ['./edit-aluno.component.css']
})
export class EditAlunoComponent implements OnInit {
  aluno;
  form;
  messageClass;
  message;
  processing = false;
  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcpf = [  /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  constructor(
    private alunoService : AlunosService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private _router: Router
  ) {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];  
      this.alunoService.getSingleAluno(id).subscribe(
        response => {
            this.aluno = response;  
            console.log(this.aluno)          
  })
    });
    this.createForm();
   }
   createForm(){
    this.form = this.formBuild.group({
      nome: [''],
      email: [''],
      telefone:[''],
      celular:[''],     
      rg: [''],
      status: [''],
      CPF: [''],
      datnsc: [''],
      privenc: [''],
      datamatricula: [''],
      sexo: [''],
      serie: ['']
})
  }
   updateAlunoSubmit() {   
    const aluno = {
      _id: this.aluno._id,
      nome: this.form.get('nome').value,
       email: this.form.get('email').value,
      telefone: this.form.get('telefone').value,
       celular: this.form.get('celular').value,       
       RG: this.form.get('rg').value,
       CPF: this.form.get('CPF').value,
       datnsc: this.form.get('datnsc').value,
       privenc: this.form.get('privenc').value,
       datamatricula: this.form.get('datamatricula').value,
       status: this.form.get('status').value,
       serie: this.form.get('serie').value,
       sexo: this.form.get('sexo').value
     }
     this.alunoService.editAluno(aluno).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data; // Set success message
        this.form.reset();
      this.toastr.success('Aluno atualizado com sucesso!', 'ok',{
        timeOut: 3000
      });
      }
    });
  }
  ngOnInit(): void {
  }

}
