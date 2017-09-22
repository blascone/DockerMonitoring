import { Pipe, PipeTransform } from '@angular/core';
import {Docker} from "../dashboard/docker-dto/docker-dto.module";

@Pipe({
  name: 'dockerMap',
  pure: false
})
export class DockerMapPipe implements  PipeTransform{

  transform(dockerMap:Map<string, Docker> ) {

    let dockerArray: Array<Docker> = new Array;
    dockerMap.forEach((value)=>{
      dockerArray.push(value);
    });

    return dockerArray;
  }





}
