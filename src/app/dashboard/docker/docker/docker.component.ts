import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
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

  @Output('stop')
  stop: EventEmitter<string> = new EventEmitter<string>();


  constructor() {
  }

  ngOnInit() {
  }


  stopContainer(){
    this.stop.emit(this.container.Id)
  }

}
