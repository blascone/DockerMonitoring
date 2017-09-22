import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[dockerContainer]'
})
export class DockerDirective {

  constructor(el: ElementRef) {

  }

}
