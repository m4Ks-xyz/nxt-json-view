import { NgClass } from '@angular/common';
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
  isUndefined,
} from '../utils/utils';

/** @internal */
@Component({
  selector: 'nxt-json-view-item',
  templateUrl: './json-view-item.component.html',
  styleUrls: ['./json-view-item.component.scss'],
  imports: [NgClass],
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

  readonly _levelLabels = computed(() => {
    const levelLabels = this.levelLabels();
    if (levelLabels !== undefined) {
      return levelLabels[this.level()] || {};
    }
    return {};
  });

  readonly _levelOpen = computed(() => {
    const levelOpen = this.levelOpen();
    if (isUndefined(levelOpen)) {
      return undefined;
    }
    return levelOpen > 0 ? levelOpen : undefined;
  });

  readonly _hasChildren = computed(() => {
    const data = this.data();
    if (isObject(data)) {
      return this._childrenKeys() && this._childrenKeys()!.length > 0;
    }
    return false;
  });

  readonly _childrenKeys = computed(() => {
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
    } else {
      if (isString(data)) {
        return 'string';
      } else if (isNumber(data)) {
        return 'number';
      } else if (isBoolean(data)) {
        return 'boolean';
      } else if (null === data) {
        return 'null';
      }
    }
    return 'null';
  });

  readonly dataType = computed(() => {
    const data = this.data();

    if (isObject(data)) {
      if (isArray(data)) {
        return 'Array';
      }
      const key = this.key();
      if (key && this._levelLabels()[key]) {
        return this._levelLabels()[key];
      }
      return 'Object';
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
    if (!(this._childrenKeys() && this._childrenKeys()!.length)) {
      return;
    }
    this.isOpen.set(!this.isOpen());
  }
}
