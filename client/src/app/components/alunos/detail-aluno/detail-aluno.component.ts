import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinanceiroService } from '../../../services/financeiro.service';
import { AlunosService } from '../../../services/alunos.service';
import { ObservacaoService } from '../../../services/observacao.service';
import { Observacao } from '../../observacao/criar-observacao/observacao';
import { ModalManager } from 'ngb-modal';
@Component({
  selector: 'app-detail-aluno',
  templateUrl: './detail-aluno.component.html',
  styleUrls: ['./detail-aluno.component.css']
})
export class DetailAlunoComponent implements OnInit {
  @ViewChild('editObs') editObs;
  @ViewChild('deleteObs') deleteObs;
  obsSelecionado: Observacao;
  private editObsRef;
  private deleteObsRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  aluno;
  notShow;
  dataNascimento;
  responsaveList;
  form;
  mensalidades;
  mensadadePaga;
  mensalidadeAberta;
  PagoManutencao;
  pagRight;
  observacoes;
  obsForm;
  constructor(
    private alunoService : AlunosService,
    private financeitoService: FinanceiroService,
    private observacaoService: ObservacaoService,
    private _router: ActivatedRoute,
    private formBuild: FormBuilder,
    private toast : ToastrService,
    private modalService: ModalManager,
  ) {
    this.getAluno();
    this.form = formBuild.group({
      files: [null, Validators.required]
    })
   
   }
   getAluno(){
    const today = Date.now()  
    this._router.params.forEach((params:Params)=>{
      let id = params['id'];
      this.alunoService.getAluno(id).subscribe((data: any)=>{
        this.aluno = data;
        this.dataNascimento = this.aluno.datnsc;
        console.log(this.dataNascimento)
        const Datanascimento = new Date(this.dataNascimento)
        this.dataNascimento = Math.floor(Math.ceil(Math.abs(Datanascimento.getTime() - today) / (1000 * 3600 * 24)) / 365.25);
        this.responsaveList = this.aluno.responsavel;
        this.financeitoService.getoneMensalidade(this.aluno._id).subscribe((data:any)=>{
          this.mensalidades = data;      
          console.log(this.mensalidades)    
          this.mensalidadeAberta = this.mensalidades.filter((item) =>(String(item.pgtomen) == "1970-12-31T00:00:00.000Z") )
          console.log(this.mensalidadeAberta)
          this.mensadadePaga = this.mensalidades.filter((item) => (String(item.pgtomen) != "1970-12-31T00:00:00.000Z" ) && item.pgtomen != 'cancelado')
          this.pagRight = this.mensadadePaga.map((item)=>{
            return {pgtomen: item.pgtomen, _id: item._id,
            vlrmen: item.vlrmen, vctmen: item.vctmen,
            obs: item.observacao
          }
          })
        })
      })
    })  
    this.obsForm = this.formBuild.group({
      message: ['']
    })
   }
   onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let files = event.target.files[0];
      this.form.get('files').setValue(files);     
    }
    this.OnSubmit();
  }
   OnSubmit() {
    const formData = new FormData();
    formData.append('files[]', this.form.get('files').value);    
    formData.append('_method', 'PUT');   
    this.alunoService.imgAluno(formData, this.aluno._id).subscribe(data => {
      // Check if comment was saved to database or not

      if (!data) {
    
      this.toast.error('não foi possível carrega a imagem') 
      } else {       
        // Clear form data after two seconds
        this.toast.success('imagem atualizada com sucesso!', 'ok', {
          timeOut: 3000
        });
        this.getAluno();
        // Clear form data after two seconds     
      }
    });
  }
  getobservacoes() {
    this._router.params.forEach((params: Params) => {
      let id = params['id'];
      this.observacaoService.getAllObservacoes(id).subscribe(response => {
        this.observacoes = response;   
        console.log(this.observacoes)    
      })
    });
  }
   noImg(){
     if(this.aluno.avatarAluno[0]){
      this.notShow = true 
     }
   }
   openEditObs(obs) {
    this.obsSelecionado = obs;  
    this.editObsRef = this.modalService.open(this.editObs, {
      size: "md",
      modalClass: 'editObs',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }
  openDeleteObs(obs) {
    this.obsSelecionado = obs;   
    this.deleteObsRef = this.modalService.open(this.deleteObs, {
      size: "md",
      modalClass: 'deleteObs',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }
  closeModal() {
    this.modalService.close(this.editObsRef);
    this.editObsRef.close();
  }
  editObservacao() {
    const newObs = {
      message: this.obsForm.get('message').value,
      _id: this.obsSelecionado._id
    }
    this.observacaoService.editObservacao(newObs)
      .subscribe(data => {
        if (!data) {
          this.toast.error('Não foi possível editar a observação!', 'Error', {
            timeOut: 3000
          });
          this.editObsRef.close();
        } else {
          this.toast.success('Observação editada com sucesso', 'ok', {
            timeOut: 3000
          });
          this.editObsRef.close();
          this.getobservacoes();
        }
      })
  }
  deleteObservacao() {
    this.observacaoService.deleteObservacao(this.obsSelecionado._id)
      .subscribe(data => {
        if (!data) {
          this.toast.error(`Não foi possível apagar a observação! ${this.obsSelecionado.message}`, 'Error', {
            timeOut: 3000
          });
          this.deleteObsRef.close();
        } else {
          this.toast.success(`A observação ${this.obsSelecionado.message} foi apagada com sucesso`, 'ok', {
            timeOut: 3000
          });
          this.deleteObsRef.close();
          this.getobservacoes();
        }
      })
  }
  ngOnInit(): void {
    this.getobservacoes()
  }

}
