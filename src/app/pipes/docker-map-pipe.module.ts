/**
 * Created by bbrauzzi on 12/05/17.
 */


import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {DockerMapPipe} from "./docker-map.pipe";



@NgModule({
  declarations:[DockerMapPipe],
  imports:[CommonModule],
  exports:[DockerMapPipe]
})

export class DockerMapPipeModule{}
