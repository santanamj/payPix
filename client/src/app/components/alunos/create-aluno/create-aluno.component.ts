import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CepService } from '../../../services/cep.service';
import { AlunosService } from '../../../services/alunos.service';
import { FormValidations } from '../../../services/form-validations';

@Component({
  selector: 'app-create-aluno',
  templateUrl: './create-aluno.component.html',
  styleUrls: ['./create-aluno.component.css']
})
export class CreateAlunoComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form;
  Listgrupos;
  vendedores;
  sexo;
  Vendedor;
  endereco;
  status;
  numerotitulo;
  aluno;
  
  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcpf = [  /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  constructor(
    private formBuild: FormBuilder,
   private router: Router,
   private cepService: CepService,
   private alunoService: AlunosService
  ) { 
    this.form = this.formBuild.group({
      nome: [''],
      email: [''],
      telefone:[''],
      celular:[''],
      celular1:[''],
      CPF:[''],
      RG: [''],       
      sexo:[''],
      datnsc: [''],
      datamatricula:[''],
      privenc:[''],         
      status: [''],
      observacao: [''],
      serie: [''],
      
      endereco: this.formBuild.group({
        cep: ['', [Validators.required, FormValidations.cepValidator]],
        numero: ['' ],
        complemento: [''],
        rua: [''],
        bairro: [''],
        cidade: [''],
        estado: [''],
       
      }), 
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
    const aluno = this.form.value;   
    console.log(aluno)
    this.alunoService.newAluno(aluno).subscribe((data: any) =>{
     if (!data) {
       this.messageClass = 'alert alert-danger'; // Return error class
       this.message = data; // Return error message
       this.processing = false; // Enable submit button       
     } else {
       console.log(data)
       this.aluno  = data.aluno._id;        
       console.log(this.aluno)
       this.messageClass = 'alert alert-success'; // Return success class
       this.message = data; // Return success message     
       // Clear form data after two seconds
       setTimeout(() => {        
         this.processing = false; // Enable submit button
         this.message = false; // Erase error/success message
         this.form.reset(); // Reset all form fields          
       }, 2000);
     }
    })
  } 
  consultaCEP(value) {
   const cep = this.form.get('endereco.cep').value;

   if (cep != null && cep !== '') {
     this.cepService.consultaCEP(cep)
     .subscribe(dados => this.populaDadosForm(dados));
   }
 }

 populaDadosForm(dados) {
   // this.form.setValue({});

   this.form.patchValue({
     
     endereco: {
       rua: dados.logradouro,
       cep: dados.cep.replace(/[^0-9]/g, ''),
       complemento: dados.complemento,
       bairro: dados.bairro,
       cidade: dados.localidade,
       estado: dados.uf
     },
    
   });
}
  ngOnInit(): void {
  }

}
