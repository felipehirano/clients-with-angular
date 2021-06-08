import { NgModule } from '@angular/core';

import { ClienteRoutingModule } from './cliente-routing.module';

import { ClienteComponent } from './cliente.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    ClienteRoutingModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzDividerModule,
    CommonModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NgxMaskModule.forChild()
  ],
  declarations: [ClienteComponent],
  exports: [ClienteComponent]
})
export class ClienteModule { }
