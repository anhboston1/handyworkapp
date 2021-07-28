import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
//import { DatatableData } from './data/datatables.data';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType
} from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProjectService } from '../project.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss', '../../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectListComponent implements OnInit {

  /**
   * Constructor
   *
   * @param {HttpClient} http
   */

   public projects: any = [];
  constructor(private http: HttpClient, private projectService: ProjectService, private cdr: ChangeDetectorRef) {
    //this.tempData = DatatableData;
    //this.multiPurposeTemp = DatatableData;

    this.projectService.getMyProjects("5cbdf2d2-327a-4dd0-a18d-aa1e47043856").subscribe((res) => {
      console.log("My Projects = ", res);
      this.projects = res;
      let temps: any = res;
      this.tempData = temps;
      this.rows = this.projects;
      this.cdr.detectChanges();
    });
  }

  public contentHeader: object;

  // row data
  public rows = this.projects;//DatatableData;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public expanded: any = {};

  public editing = {};

  public chkBoxSelected = [];
  public SelectionType = SelectionType;


  // private
  private tempData = [];

  /**
   * filterUpdate
   *
   * @param code
   */
   filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
 
  /**
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }



  /**
   * MultiPurposeFilterUpdate
   *
   * @param event
   */


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {

    // content header
    this.contentHeader = {
      headerTitle: 'Datatables',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '#'
          },
          {
            name: 'Forms & Tables',
            isLink: true,
            link: ''
          },
          {
            name: 'Datatables',
            isLink: false
          }
        ]
      }
    };
  }

}
