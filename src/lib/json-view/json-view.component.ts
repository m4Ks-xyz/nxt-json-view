import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JsonViewItemComponent } from '../json-view-item/json-view-item.component';
import { LevelLabels } from '../utils/interfaces';

@Component({
  selector: 'nxt-json-view',
  templateUrl: './json-view.component.html',
  imports: [JsonViewItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonViewComponent {
  /** JSON data, any valid JSON object */
  readonly data = input<any>();
  /** Initial number of levels to be expanded */
  readonly levelOpen = input<number>();
  /** Custom labels for elements within the hierarcy */
  readonly levelLabels = input<LevelLabels>();
}
