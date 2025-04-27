import { Component } from '@angular/core';
import { JsonViewComponent } from '../lib/json-view/json-view.component';

@Component({
  selector: 'app-root',
  imports: [JsonViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nxt-json-view';

  data = {
    name: 'twp0217',
    url: 'https://github.com/twp0217',
    string: 'github',
    number: 88,
    boolean: true,
    object: {
      obj1: 'obj1',
      obj2: 'obj2',
      object: {
        obj11: 'obj11',
        obj22: 'obj22',
      },
      emptyArray: [],
    },
    array: [1, 2, 3],
    null: null,
  };
}
