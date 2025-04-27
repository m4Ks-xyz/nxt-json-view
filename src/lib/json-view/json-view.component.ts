import { Component, ViewEncapsulation, input } from '@angular/core';
import { LevelLabels } from '../utils/interfaces';

@Component({
  selector: 'nxt-json-view',
  templateUrl: './json-view.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  standalone: false,
})
export class JsonViewComponent {
  /** JSON data, any valid JSON object */
  readonly data = input<any>();
  /** Initial number of levels to be expanded */
  readonly levelOpen = input<number>();
  /** Custom labels for elements within the hierarcy */
  readonly levelLabels = input<LevelLabels>();
}
