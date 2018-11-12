import { Directive, ElementRef, Input, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragSort]'
})
export class DragSortDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('appDragSort') _index: number;
  // tslint:disable-next-line:no-input-rename
  @Input('mainModel') _model: Array<any>;
  // tslint:disable-next-line:no-inferrable-types
  _bool: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  _movementY: number = 0;

  _offsetTopArray: Array<any> = [];

  /**
   * @desc 监听鼠标点击事件
   */
  @HostListener('mousedown', ['$event']) onMousedown(event) {
    this._bool = true;
    this._movementY = 0;
  }

  /**
   * @desc 监听鼠标拖拽事件
   */
  @HostListener('mousemove', ['$event']) onMousemove(event) {
    if (this._bool) {
      // 偏移量累计
      this._movementY += event.movementY;

      // 元素拖拽渲染
      const selectElement = this.el.nativeElement;
      if (selectElement) {
        this.render.setStyle(selectElement, 'position', 'relative');
        this.render.setStyle(selectElement, 'top', `${this._movementY}px`);
        this.render.setStyle(selectElement, 'z-index', '9');
      }

      // 子元素offtop数组
      const offsetTopArray = [];
      const childNodeList = this.el.nativeElement.parentNode.children;
      for (const key in childNodeList) {
        if (childNodeList[key].offsetTop) {
          offsetTopArray.push(childNodeList[key].offsetTop);
        }
      }
      this._offsetTopArray = offsetTopArray;
    }
  }

  /**
   * @desc 监听鼠标松开事件
   */
  @HostListener('mouseup', ['$event']) onMouseup(event) {
    this.setModel();
  }

  /**
   * @desc 监听鼠标离开事件
   */
  @HostListener('mouseleave', ['$event']) onmouseleave(event) {
    this.setModel();
  }

  /**
   * @desc model重组
   */
  setModel() {
    if (this._bool) {
      // model重组
      const top = this.el.nativeElement.offsetTop;
      const arr = this._offsetTopArray;
      const index = this._index;

      if (this._movementY > 0) {
        for (let i = index; i < arr.length; i++) {
          if (top > arr[i] && top < arr[i + 1]) {
            const item = this._model.slice(index, index + 1);
            this._model.splice(index, 1);
            this._model.splice(i, 0, item[0]);
            break;
          } else if (top > arr[arr.length - 1]) {
            const item = this._model[index];
            this._model.splice(index, 1);
            this._model.push(item);
            break;
          }
        }
      } else if (this._movementY < 0) {
        for (let i = index; i >= 0; i--) {
          if (top < arr[i] && top > arr[i - 1]) {
            const item = this._model.slice(index, index + 1);
            this._model.splice(index, 1);
            this._model.splice(i, 0, item[0]);
            break;
          } else if (top < arr[0]) {
            const item = this._model[index];
            this._model.splice(index, 1);
            this._model.unshift(item);
            break;
          }
        }
      }
      this.clearStyle();
    }
  }

  /**
   * @desc 清除样式
   */
  clearStyle() {
    this._bool = false;

    const selectElement = this.el.nativeElement;
    if (selectElement) {
      this.render.setStyle(selectElement, 'top', '0px');
      this.render.setStyle(selectElement, 'z-index', '1');
    }
  }

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) {

  }

}
