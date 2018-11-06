import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-sort',
  templateUrl: './drag-sort.component.html',
  styleUrls: ['./drag-sort.component.css']
})
export class DragSortComponent implements OnInit {

  model: Array<any> = [
    {
      value: 1,
      color: '#FF5142',
      isSelected: false
    },
    {
      value: 2,
      color: '#FFA942',
      isSelected: false
    },
    {
      value: 3,
      color: '#B7FF42',
      isSelected: false
    },
    {
      value: 4,
      color: '#42B0FF',
      isSelected: false
    },
    {
      value: 5,
      color: '#A142FF',
      isSelected: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  selectItem(index: number) {
    this.model.forEach((item, i) => {
      item.isSelected = index === i ? true : false;
    });
  }

}
