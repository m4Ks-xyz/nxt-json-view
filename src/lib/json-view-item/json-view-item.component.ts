import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  input,
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
      if (this.isInit) {
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

  isOpen: boolean = false;
  childrenKeys?: string[];
  hasChildren: boolean = false;
  dataType?: string;
  value: any;
  valueType?: string;
  isObject: boolean = false;
  isArray: boolean = false;
  isInit: boolean = false;
  _levelLabels: { [key: string]: string } = {};

  ngOnInit() {
    this.init();
    this.isInit = true;
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
      this._levelLabels = levelLabels[this.level()] || {};
    }
  }

  levelOpenHandle() {
    const levelOpen = this.levelOpen();
    if (!isUndefined(levelOpen) && this.level() <= levelOpen) {
      this.isOpen = true;
    }
  }

  childrenKeysHandle() {
    const data = this.data();
    if (isObject(data)) {
      this.childrenKeys = Object.keys(data);
      if (this.childrenKeys && this.childrenKeys.length) {
        this.hasChildren = true;
      }
    }
  }

  dataHandle() {
    const data = this.data();
    if (isObject(data)) {
      this.isObject = true;
      this.dataType = 'Object';
      if (isArray(data)) {
        this.isArray = true;
        this.dataType = 'Array';
      }
      const key = this.key();
      if (key && this._levelLabels[key]) {
        this.dataType = this._levelLabels[key];
      }
    } else {
      this.value = data;
      if (isString(data)) {
        this.valueType = 'string';
      } else if (isNumber(data)) {
        this.valueType = 'number';
      } else if (isBoolean(data)) {
        this.valueType = 'boolean';
      } else if (null === data) {
        this.valueType = 'null';
        this.value = 'null';
      }
    }
  }

  toggle() {
    if (!(this.childrenKeys && this.childrenKeys.length)) {
      return;
    }
    this.isOpen = !this.isOpen;
  }
}
