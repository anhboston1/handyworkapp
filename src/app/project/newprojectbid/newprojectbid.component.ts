import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newprojectbid',
  templateUrl: './newprojectbid.component.html',
  styleUrls: ['./newprojectbid.component.scss']
})
export class NewprojectbidComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  projectname = "ipsome";
  projectid = "";
  daycomplete = "";
  bidamount = 0;
  public sub: any;
  ngOnInit() {
    this.sub =
      this.route.queryParams
        .subscribe(params => {
          console.log("this.projectid = " + JSON.stringify(params['projectid']));
          console.log("this.projectname = " + JSON.stringify(params['projectname']));
          this.projectname = JSON.stringify(params['projectname']);
          this.projectid = JSON.stringify(params['projectid']);
        });
  }
}
