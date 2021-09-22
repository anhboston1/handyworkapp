import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { ProjectService } from '../project.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projectbids',
  templateUrl: './projectbids.component.html',
  styleUrls: ['./projectbids.component.scss']
})
export class ProjectbidsComponent implements OnInit {
  projectname = "ipsome";
  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private auth: AuthService,
    private projectService: ProjectService
    ) { }

    projectid = "";
    public sub: any;
    projectBids:any = [];
    ngOnInit() {
      this.sub =
        this.route.queryParams
          .subscribe(params => {
            console.log("this.projectid = " + JSON.stringify(params['projectid']));
            console.log("this.projectname = " + JSON.stringify(params['projectname']));
            this.projectname = JSON.stringify(params['projectname']);
            this.projectid = params['projectid'];
            this.projectService.getProjectBids(this.projectid).subscribe((res) => {
              //alert(JSON.stringify(res));
              console.log(res);
              this.projectBids = res;
            })
          });
    }
  vActive = 'top'; // Vertical Pills
  active = 1; // Basic Navs
  kActive = 1; // Keep content
  sActive; // Selecing Navs
  disabled = true;
  dActive; // Dynamic Navs

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;


  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.sActive = 1;
    }
  }
}
