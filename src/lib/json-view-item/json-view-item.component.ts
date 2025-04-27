import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
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
export class JsonViewItemComponent implements OnInit {
  constructor() {
    effect(() => {
      this.data();
      if (this.isInit()) {
        this.init();
      }
    });
  }

  /** JSON data, any valid JSON object */
  readonly data = input<any>();
  readonly key = input<string>();
  readonly level = input<number>(0);
  readonly levelOpen = input<number>();
  readonly levelLabels = input<LevelLabels>();

  isOpen = signal<boolean>(false);
  childrenKeys = signal<string[] | undefined>(undefined);
  hasChildren = signal<boolean>(false);
  dataType = signal<string | undefined>(undefined);
  value = signal<any>(undefined);
  valueType = signal<string | undefined>(undefined);
  isObject = signal<boolean>(false);
  isArray = signal<boolean>(false);
  isInit = signal<boolean>(false);
  _levelLabels = signal<{ [key: string]: string }>({});

  ngOnInit() {
    this.init();
    this.isInit.set(true);
  }

  init() {
    this.levelLabelHandle();
    this.levelOpenHandle();
    this.childrenKeysHandle();
    this.dataHandle();
  }

  levelLabelHandle() {
    const levelLabels = this.levelLabels();
    if (levelLabels !== undefined) {
      this._levelLabels.set(levelLabels[this.level()] || {});
    }
  }

  levelOpenHandle() {
    const levelOpen = this.levelOpen();
    if (!isUndefined(levelOpen) && this.level() <= levelOpen) {
      this.isOpen.set(true);
    }
  }

  childrenKeysHandle() {
    const data = this.data();
    if (isObject(data)) {
      this.childrenKeys.set(Object.keys(data));
      if (this.childrenKeys() && this.childrenKeys()!.length) {
        this.hasChildren.set(true);
      }
    }
  }

  dataHandle() {
    const data = this.data();
    if (isObject(data)) {
      this.isObject.set(true);
      this.dataType.set('Object');
      if (isArray(data)) {
        this.isArray.set(true);
        this.dataType.set('Array');
      }
      const key = this.key();
      if (key && this._levelLabels()[key]) {
        this.dataType.set(this._levelLabels()[key]);
      }
    } else {
      this.value.set(data);
      if (isString(data)) {
        this.valueType.set('string');
      } else if (isNumber(data)) {
        this.valueType.set('number');
      } else if (isBoolean(data)) {
        this.valueType.set('boolean');
      } else if (null === data) {
        this.valueType.set('null');
        this.value.set('null');
      }
    }
  }

  toggle() {
    if (!(this.childrenKeys() && this.childrenKeys()!.length)) {
      return;
    }
    this.isOpen.set(!this.isOpen());
  }
}
