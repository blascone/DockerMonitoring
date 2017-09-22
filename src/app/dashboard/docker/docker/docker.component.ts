import {Component, OnInit, ViewEncapsulation, Input, HostBinding} from '@angular/core';
import {Docker} from "../../docker-dto/docker-dto.module";

@Component({
  selector: 'docker',
  templateUrl: './docker.component.html',
  styleUrls: ['./docker.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DockerComponent implements OnInit {

  @Input()
  container: Docker;




//isRunning:boolean = false


constructor()
{
}

ngOnInit()
{
}

}
