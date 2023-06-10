import { Component, NgModule, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoryDetailComponent } from './category.detail.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  items: MenuItem[];

  files: TreeNode[] = [];
  selectedFiles: TreeNode[] = [];
  public isLoading = false;
  constructor(private dialogService: DialogService) { }

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
      }
    ]
  }

  onAddNew() {
    this.dialogService.open(CategoryDetailComponent, {
      data: {
        id: 0
      },
      header: 'Add new category',
      width: '60%',
      modal: true,
      contentStyle: { overflow: 'auto' },
      maximizable: true,
      resizable: false
    })
  }


  onNodeSelect(event: any) {
    console.log('event', event)
  }

}
