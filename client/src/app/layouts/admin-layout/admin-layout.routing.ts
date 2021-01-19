import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MensalidadesComponent } from '../../components/financeiro/mensalidades/mensalidades.component';
import { CriarObservacaoComponent } from '../../components/observacao/criar-observacao/criar-observacao.component';
import { DadosFinancasComponent } from '../../components/financeiro/dados-financas/dados-financas.component';
import { LoginComponent } from '../../components/login/login.component';
import { AuthGuard } from '../../guards/auth.guard';
import { FinanceiroDetailComponent } from '../../components/financeiro/financeiro-detail/financeiro-detail.component';
import { FinanceiroDateComponent } from '../../components/financeiro/financeiro-date/financeiro-date.component';
import { PendentesComponent } from '../../components/financeiro/pendentes/pendentes.component';
import { FecharCaixaComponent } from '../../components/financeiro/fechar-caixa/fechar-caixa.component';
import { RelatorioComponent } from '../../components/financeiro/relatorio/relatorio.component';
import { RelatorioDataComponent } from '../../components/financeiro/relatorio-data/relatorio-data.component';


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
    { path: 'relatorio',        component: RelatorioComponent },
    { path: 'financeiro-detail/:id',        component: FinanceiroDetailComponent },
   
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
      path:'pendente',  component: PendentesComponent,
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
      path:'fecharcaixa',  component: FecharCaixaComponent,
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ]    
},
{path: 'financeiro', children:[
  {
      path:'relatorioData',  component: RelatorioDataComponent,
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
