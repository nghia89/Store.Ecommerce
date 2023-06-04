import { Component, NgModule, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  items: MenuItem[];

  files: TreeNode[] = [];
  selectedFiles: TreeNode[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [{
      label: 'Manage Categories'
    }];
    this.files = [
      {
        "label": "Lazy Node 0",
        "data": "Node 0",
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "leaf": false,
        "children": [{
          "key": "0-0",
          "label": "Work",
          "data": "Work Folder",
          "collapsedIcon": "pi pi-folder",
        }]
      },
      {
        "label": "Lazy Node 1",
        "data": "Node 1",
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "leaf": false
      },
      {
        "label": "Lazy Node 1",
        "data": "Node 2",
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "leaf": false
      }
    ]
  }


  onNodeSelect(event: any) {
    console.log('event', event)
  }

}
