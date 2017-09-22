import 'rxjs/add/operator/finally';

import {Component, OnInit, OnDestroy, ElementRef, AfterViewChecked, ViewEncapsulation, ViewChild} from '@angular/core';

import {QuoteService} from './quote.service';

import * as io from 'socket.io-client';

import {Observable} from "rxjs";
import {DockerMonitorService} from "../docker-monitoring/docker-monitor-service";


interface IStats {
  // v: number;
  // myNumber: number;
  // image:string;
  // name:string;
  type: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {


  @ViewChild('scrollMe') private scrollMe: ElementRef;

  quote: string;
  isLoading: boolean;
  messages: string[];

  dockerlogs: string = "start\n";
  socket: any;

  private url: string;


  constructor(private dockerMonitorService: DockerMonitorService) {

  }

  ngOnInit() {
    console.log("ngOnInit");

    this.dockerMonitorService.getRunningDockers().subscribe(dockers => {
      console.log("DOOOOOCKER " + dockers );
    });



  }

  ngAfterViewChecked() {
    this.scrollToBottom();

  }

  ngOnDestroy() {

  }


  scrollToBottom(): void {
    try {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch (err) {
    }
  }


}

