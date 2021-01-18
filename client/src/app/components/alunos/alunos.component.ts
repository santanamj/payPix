import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AlunosService } from './../../services/alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  alunos;
  searchTerm$ = new Subject<string>();
  searchTitulo$ = new Subject<string>();
  responsaveis;
  data;
  constructor(
    private alunoService : AlunosService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getProfile().subscribe((data: any) => {
      if(data.success ==false){
       console.log('user não logado')
       this.router.navigate(['/login']);
      }
      this.data = data.success;     
    }) 
    this.alunoService.getAllAlunos().subscribe((data: any)=>{
      this.alunos = data;
     

    })
    this.alunoService.search(this.searchTerm$).subscribe((data: any)=>{
      this.alunos = data;      
    })
    this.alunoService.searchMatricula(this.searchTitulo$).subscribe((data: any)=>{
      this.alunos = data;      
    })
   }

  ngOnInit(): void {
  }

}
