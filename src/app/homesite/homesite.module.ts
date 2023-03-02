import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteComponent } from './site/site.component';
import { SiteRoutingModule } from './site-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    SiteComponent
  ],
  imports: [
    CommonModule,SiteRoutingModule,MaterialModule
  ]
})
export class HomesiteModule { }
