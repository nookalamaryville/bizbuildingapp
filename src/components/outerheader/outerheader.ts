import { Component } from '@angular/core';

/**
 * Generated class for the OuterheaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'outerheader',
  templateUrl: 'outerheader.html'
})
export class OuterheaderComponent {

  text: string;

  constructor() {
    console.log('Hello OuterheaderComponent Component');
    this.text = 'Hello World';
  }

}
