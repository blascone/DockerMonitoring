import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {DockerMonitorService} from "../docker-monitoring/docker-monitor-service";
import {DockerDirective} from "../directives/docker.directive";
import { DockerComponent } from './docker/docker/docker.component';
import {DockerMapPipeModule} from "../pipes/docker-map-pipe.module";
import {PopoverModule} from "ngx-popover";





@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    DashboardRoutingModule,
    DockerMapPipeModule,
    PopoverModule
  ],
  declarations: [
    DashboardComponent,
    DockerDirective,
    DockerComponent
  ],
  providers: [
    DockerMonitorService
  ]
})
export class DashboardModule { }
