
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'task-apptunix';
  displayedColumns: string[] = ['name', 'building.name', 'building_towers.tower_name', 'property_type.name', 'min_price', 'bedroom', 'bathroom', 'half_bathroom'];
  min_price: number = 0;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort;

  configItems = [
    { id: 2, name: 'Bathroom' },
    { id: 3, name: 'Bedroom' },
    { id: 4, name: 'Half Bathroom' },

  ];
  selectedPeople = [
  ];
  constructor(private ConfigService: ConfigService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.loaddata();
  }

  onItemSelect(event: any) {
console.log(this.selectedPeople)
  }


  
  loaddata() {
    this.ConfigService.getdata().subscribe(data => {
      this.dataSource.data = data as any;
    })
  }

  changeCount(event: any) {
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return data.min_price > filter
    }
    this.dataSource.filter = event.target.value
  }

  applySearchFilter(filterValue: any) {
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.building.name.toLowerCase().includes(filter) || data.building_towers.tower_name.toLowerCase().includes(filter) || data.property_type.name.toLowerCase().includes(filter);
    };
    filterValue = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue
  }


  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'building.name': return item.building.name;
        case 'building_towers.tower_name': return item.building_towers.tower_name;
        case 'property_type.name': return item.property_type.name;
        case 'property_type.name': return item.property_type.name;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;

  }
}

