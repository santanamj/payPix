import { forwardRef, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { CreateAlunoComponent } from './create-aluno/create-aluno.component';
import { AlunosService } from './../../services/alunos.service';
import { TextMaskModule } from 'angular2-text-mask';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
  import {DateAdapter, MatNativeDateModule, MatPseudoCheckboxModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
  import localeBr from '@angular/common/locales/br';
  
  import ptBr from '@angular/common/locales/pt';


import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DetailAlunoComponent } from './detail-aluno/detail-aluno.component';
import { MensalidadesComponent } from '../financeiro/mensalidades/mensalidades.component';
import { ModalModule } from 'ngb-modal';
import { EditAlunoComponent } from './edit-aluno/edit-aluno.component';
import { EditResponsavelComponent } from './edit-responsavel/edit-responsavel.component';
import { EditEnderecoComponent } from './edit-endereco/edit-endereco.component';
registerLocaleData(localePt);
@NgModule({
    declarations: [   
     AlunosComponent,
     CreateAlunoComponent,
     DetailAlunoComponent,
     
     EditAlunoComponent,
     EditResponsavelComponent,
     EditEnderecoComponent
    ],
    imports: [
        CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TextMaskModule,
    ReactiveFormsModule,
    ModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatStepperModule,
    MatIconModule,
    MatCardModule,
    MatNativeDateModule
    ],
    providers:[ { provide: MAT_DATE_LOCALE,  useValue: 'pt-BR' }, { provide: LOCALE_ID, useValue: 'pt' },
    
        AlunosService,
        MatDatepickerModule
  ],
    exports: [MatDatepickerModule],
    schemas: [NO_ERRORS_SCHEMA]
  })
  export class AlunoModule { }