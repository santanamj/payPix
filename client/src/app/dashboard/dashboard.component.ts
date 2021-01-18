import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AlunosService } from '../services/alunos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alunos;
  constructor(
    private alunoService: AlunosService
  ) { 
    this.alunoService.getNuAlunos().subscribe((data: any)=>{
      this.alunos = data;
    })
  }

  ngOnInit() {
  }
}
