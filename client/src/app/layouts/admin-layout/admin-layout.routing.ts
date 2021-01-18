import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AlunosComponent } from '../../components/alunos/alunos.component';
import { CreateAlunoComponent } from '../../components/alunos/create-aluno/create-aluno.component';
import { DetailAlunoComponent } from '../../components/alunos/detail-aluno/detail-aluno.component';
import { MensalidadesComponent } from '../../components/financeiro/mensalidades/mensalidades.component';
import { CriarObservacaoComponent } from '../../components/observacao/criar-observacao/criar-observacao.component';
import { DadosFinancasComponent } from '../../components/financeiro/dados-financas/dados-financas.component';
import { MensalidaMesComponent } from '../../components/financeiro/mensalida-mes/mensalida-mes.component';
import { MensalidaMesDateComponent } from '../../components/financeiro/mensalida-mes-date/mensalida-mes-date.component';
import { MensalidaMesFalteComponent } from '../../components/financeiro/mensalida-mes-falte/mensalida-mes-falte.component';
import { MensalidaMesFalteDateComponent } from '../../components/financeiro/mensalida-mes-falte-date/mensalida-mes-falte-date.component';

import { EditAlunoComponent } from '../../components/alunos/edit-aluno/edit-aluno.component';
import { EditResponsavelComponent } from '../../components/alunos/edit-responsavel/edit-responsavel.component';
import { EditEnderecoComponent } from '../../components/alunos/edit-endereco/edit-endereco.component';
import { LoginComponent } from '../../components/login/login.component';
import { AuthGuard } from '../../guards/auth.guard';
import { FinanceiroDetailComponent } from '../../components/financeiro/financeiro-detail/financeiro-detail.component';
import { FinanceiroDateComponent } from '../../components/financeiro/financeiro-date/financeiro-date.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login',        component: LoginComponent },
   
    { path: 'financeiro-detail/:id',        component: FinanceiroDetailComponent },
    {path: 'aluno', children:[
    {
        path:'lista-alunos',  component: AlunosComponent, canActivate: [AuthGuard],
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      
    ]    
},
{path: 'aluno', children:[
  {
      path:'criar-aluno',  component: CreateAlunoComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'aluno', children:[
  {
      path:'perfil-aluno/:id',  component: DetailAlunoComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'aluno', children:[
  {
      path:'edit-aluno/:id',  component: EditAlunoComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'aluno', children:[
  {
      path:'responsavel-aluno/:id',  component: EditResponsavelComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'aluno', children:[
  {
      path:'endereco-aluno/:id',  component: EditEnderecoComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'financeiro', children:[
  {
      path:'financas',  component: DadosFinancasComponent, canActivate: [AuthGuard],
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'financeiro', children:[
  {
      path:'cobranca',  component: MensalidadesComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},

{path: 'financeiro', children:[
  {
      path:'mensalidadeMes',  component: MensalidaMesComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'financeiro', children:[
  {
      path:'consultarData',  component: FinanceiroDateComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'financeiro', children:[
  {
      path:'mensalidadeMesFalte',  component: MensalidaMesFalteComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'financeiro', children:[
  {
      path:'mensalidadeMesdataFalte',  component: MensalidaMesFalteDateComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},

{path: 'observacao', children:[
  {
      path:'criar-observacao/:id',  component: CriarObservacaoComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
}
];
