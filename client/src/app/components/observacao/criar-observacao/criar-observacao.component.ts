import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ObservacaoService } from '../../../services/observacao.service';
import { ModalManager } from 'ngb-modal';
import { Observacao } from './observacao';
import { AlunosService } from '../../../services/alunos.service';

@Component({
  selector: 'app-criar-observacao',
  templateUrl: './criar-observacao.component.html',
  styleUrls: ['./criar-observacao.component.css']
})
export class CriarObservacaoComponent implements OnInit {
  @ViewChild('editObs') editObs;
  private editObsRef;
  obsSelecionado = Observacao;
  aluno;
  observacao;
  form;
  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private _router: Router,    
    private observacaoService: ObservacaoService,   
    private toastr: ToastrService,
    private modalService: ModalManager,
    private alunoService: AlunosService
  ) {
    this.route.params.forEach((params: Params)=>{
      let id = params['id'];
      this.alunoService.getSingleAluno(id).subscribe(data=>{
        this.aluno = data;
      })
    })
    this.form = this.formBuild.group({
      observacao: ['']
    })
   }

  registroSubmit(){
    const obs = {
      message: this.form.get('observacao').value,
      matricula: this.aluno.matricula
    }
    this.observacaoService.newObservacao(obs).subscribe(data=>{
      if(!data){
        console.log('erro')
      }else{
        this.form.reset();
        this.toastr.success('Observação criada com sucesso', 'ok', {
         timeOut: 3000
        });
      }
    })
  }
  ngOnInit(): void {
  }

}
