import { DEFAULT_CURRENCY_CODE, forwardRef, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TextMaskModule } from 'angular2-text-mask';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {DateAdapter, MatNativeDateModule, MatPseudoCheckboxModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FinanceiroService } from './../../services/financeiro.service';
import { MensalidadesComponent } from './mensalidades/mensalidades.component';

import { DadosFinancasComponent } from './dados-financas/dados-financas.component';
import { MensalidaMesComponent } from './mensalida-mes/mensalida-mes.component';
import { MensalidaMesDateComponent } from './mensalida-mes-date/mensalida-mes-date.component';
import { MensalidaMesFalteComponent } from './mensalida-mes-falte/mensalida-mes-falte.component';
import { MensalidaMesFalteDateComponent } from './mensalida-mes-falte-date/mensalida-mes-falte-date.component';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FinanceiroDetailComponent } from './financeiro-detail/financeiro-detail.component';
import { FinanceiroDateComponent } from './financeiro-date/financeiro-date.component';
registerLocaleData(localePt);
@NgModule({
    declarations: [   
      MensalidadesComponent,
   DadosFinancasComponent, MensalidaMesComponent, MensalidaMesDateComponent, MensalidaMesFalteComponent, MensalidaMesFalteDateComponent, FinanceiroDetailComponent, FinanceiroDateComponent],
    imports: [
        CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatStepperModule,
    MatIconModule,
    MatCardModule,
    MatNativeDateModule,
    ],
    providers:[ { provide: MAT_DATE_LOCALE,  useValue: 'pt-BR' }, { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
  },
        FinanceiroService,
        MatDatepickerModule,
        CurrencyPipe
  ],
    exports: [MatDatepickerModule],
    schemas: [NO_ERRORS_SCHEMA]
  })
  export class FinanceiroModule { }