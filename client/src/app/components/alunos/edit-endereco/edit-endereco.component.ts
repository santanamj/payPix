import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { CepService } from '../../../services/cep.service';
import { AlunosService } from '../../../services/alunos.service';
import { FormValidations } from '../../../services/form-validations';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-endereco',
  templateUrl: './edit-endereco.component.html',
  styleUrls: ['./edit-endereco.component.css']
})
export class EditEnderecoComponent implements OnInit {
  aluno;
  form;
  endereco;
  messageClass;
  message;
  processing = false;
  bc;
  alunoId;
  nomeAluno
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
            console.log(this.aluno)          
  })
    }); 
    
    this.form = this.formBuild.group({
      
      endereco: this.formBuild.group({
        cep: ['', [Validators.required, FormValidations.cepValidator]],
        numero: ['' ],
        complemento: [''],
        rua: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required]
      })          
})
  }
  registroSubmit(){
    const registerAluno = this.form.value;
    
    const aluno = {
      endereco: registerAluno,
      _id: this.alunoId
    }
    console.log(aluno)
    this.alunoService.addressAluno(aluno).subscribe(data =>{
     if (!data) {
       this.messageClass = 'alert alert-danger'; // Return error class
       this.message = data; // Return error message
       this.processing = false; // Enable submit button       
     } else {
       this.messageClass = 'alert alert-success'; // Return success class
       this.message = data; // Return success message     
       // Clear form data after two seconds
       this.toastr.success('Endereço atualizado com sucesso!', 'ok',{
        timeOut: 3000
      });
      this.form.reset();      
      
     }
    })
  } 
   consultaCEP(valor) {
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
