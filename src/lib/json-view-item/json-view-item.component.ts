import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { LevelLabels } from '../utils/interfaces';
import {
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
} from '../utils/utils';

/** @internal */
@Component({
  selector: 'nxt-json-view-item',
  templateUrl: './json-view-item.component.html',
  styleUrls: ['./json-view-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonViewItemComponent {
  /** JSON data, any valid JSON object */
  readonly data = input<any>();
  readonly key = input<string>();
  readonly level = input<number>(0);
  readonly levelOpen = input<number>();
  readonly levelLabels = input<LevelLabels>();

  isOpen = signal<boolean>(false);

  readonly hasChildren = computed(() => {
    const data = this.data();
    if (isObject(data)) {
      return this.childrenKeys() && this.childrenKeys()!.length > 0;
    }
    return false;
  });

  readonly childrenKeys = computed(() => {
    const data = this.data();
    return isObject(data) ? Object.keys(data) : undefined;
  });

  readonly valueType = computed(() => {
    const data = this.data();
    if (isObject(data)) {
      if (isArray(data)) {
        return 'Array';
      } else {
        return 'Object';
      }
    } else if (isString(data)) {
      return 'string';
    } else if (isNumber(data)) {
      return 'number';
    } else if (isBoolean(data)) {
      return 'boolean';
    } else if (null === data) {
      return 'null';
    }
    return 'null';
  });

  readonly isObject = computed(() => {
    const data = this.data();
    if (isObject(data)) {
      return true;
    }
    return false;
  });

  readonly isArray = computed(() => {
    const data = this.data();
    if (isArray(data)) {
      return true;
    }
    return false;
  });

  readonly value = computed(() => {
    const data = this.data();

    if (data === null) {
      return 'null';
    } else {
      return data;
    }
  });

  toggle() {
    if (this.childrenKeys()?.length) {
      this.isOpen.set(!this.isOpen());
    }
  }
}
