import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';
import { AlunosService } from '../services/alunos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alunos;
  user;
  constructor(
    private alunoService: AlunosService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.authService.getProfile().subscribe((data: any) => {
      if (data.success == false) {
        this.router.navigate(['/login']);
      }
      this.user = data;
      console.log(this.user.user.username)
    })
  }

  ngOnInit() {
  }
}
