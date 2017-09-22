/**
 * Created by bbrauzzi on 09/05/17.
 */

import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observer} from "rxjs";
import {Docker} from "../dashboard/docker-dto/docker-dto.module";
import {Http} from "@angular/http";


@Injectable()
export class DockerMonitorService {


  dockerlogs: string = "start\n";
  socket: any;


  private observableDocker: Observable<Docker>;

  constructor(private http: Http) {
    this.socket = io();
  }


  public getDockersUp(): Observable<Docker> {

    this.observableDocker = new Observable<Docker>((observer: Observer<Docker>) => {
      this.socket.on('dockers_up', (data: JSON) => {
        observer.next(Docker.fromJson(data["text"]));
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return this.observableDocker;
  }

  public getDockersDown(): Observable<Docker> {

    this.observableDocker = new Observable<Docker>((observer: Observer<Docker>) => {
      this.socket.on('dockers_down', (data: JSON) => {
        observer.next(Docker.fromJson(data["text"]));
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return this.observableDocker;
  }


  public getRunningDockers(): Observable<Docker[]> {
    return this.http.get("/runningDockers", { cache: false })
      .map((res => res.json()));
  }


}

