import {
  Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef
} from '@angular/core';
import {DockerMonitorService} from "../docker-monitoring/docker-monitor-service";
import {Docker} from "./docker-dto/docker-dto.module";
import {forEach} from "@angular/router/src/utils/collection";
import {map} from "rxjs/operator/map";
import {DockerMapPipe} from "../pipes/docker-map.pipe";
import {DockerComponent} from "./docker/docker/docker.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  connection: any;

  dockerConsole: string = "";

  dockerNodes: Map<string, Docker> = new Map<string, Docker>();

  sampleMap: Map<string, string>;


  @ViewChild('scrollMe')
  private scrollMe: ElementRef;


  constructor(private dockeMonitoring: DockerMonitorService) {

    this.sampleMap = new Map();


    this.dockerNodes = new Map<string, Docker>();
    // subscribed to stats
    this.connection = dockeMonitoring.getDockersUp().subscribe(
      message => {
        //
        this.dockerNodes.set(message.Id, message);

        // write json to dashboard console
        this.dockerConsole += "<br/><span class='bashprompt'>bash# </span> <span class='dockerup'> container up! </span>" + message.toString();

        console.log("looping running dockers");
        this.dockerNodes.forEach((value, index, map) => {
          console.log(value.Id);
        });

      }
    );


    this.connection = dockeMonitoring.getDockersDown().subscribe(
      message => {
        //

        // write json to dashboard console
        this.dockerConsole += "<br/><span class='bashprompt'>bash# </span> <span class='dockerdown'> container down </span>" + message.toString();

        console.log("looping running dockers");
        this.dockerNodes.forEach((value) => {
          console.log(value.Id);
        });


        console.log("removing " + message.Id);
        if (this.dockerNodes.has(message.Id)) {
          message.Status = "Shutting down";
          message.State = "OFFLINE";
          this.dockerNodes.set(message.Id, message);
          setTimeout(() => {
            this.dockerNodes.delete(message.Id);
          }, 10000);

        }


      }
    );


  }


  ngOnInit() {
    console.log("ngOnInit");

    this.dockeMonitoring.getRunningDockers().subscribe(dockers => {
      for (let value of dockers) {
        value.rawJson = JSON.stringify(value).toString();
        this.dockerNodes.set(value.Id, value);
        // write json to dashboard console
        this.dockerConsole += "<br/><span class='bashprompt'>bash# </span> <span class='dockerup'> container up! </span>" + value.rawJson;
      }
      ;

    });
  }


  ngAfterViewChecked() {
    this.scrollToBottom();

  }


  scrollToBottom(): void {
    try {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch
      (err) {
    }
  }


  stopContainer(containerId: string) {

    console.log(containerId);
    this.dockeMonitoring.stopDocker(containerId).subscribe(response => {
        this.dockerConsole += "<br/><span class='bashprompt'>bash# </span> <span class='dockerup'> container stopped successfully! </span>" + JSON.stringify(response);
    });

  }

}
