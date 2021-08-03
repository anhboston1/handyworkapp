import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-newprojectbid',
  templateUrl: './newprojectbid.component.html',
  styleUrls: ['./newprojectbid.component.scss']
})
export class NewprojectbidComponent implements OnInit {

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private auth: AuthService,
    private projectService: ProjectService
    ) { }
  projectname = "ipsome";
  projectid = "";
  daycomplete: Number = 0;
  bidamount: Number = 0;
  proposal = "";
  public sub: any;
  ngOnInit() {
    this.sub =
      this.route.queryParams
        .subscribe(params => {
          console.log("this.projectid = " + JSON.stringify(params['projectid']));
          console.log("this.projectname = " + JSON.stringify(params['projectname']));
          this.projectname = JSON.stringify(params['projectname']);
          this.projectid = params['projectid'];
        });
  }

  bidproject() {
    let data = {
      "price": Number(this.bidamount),
      "daysToComplete": Number(this.daycomplete),
      "message": this.proposal,
      "userId": this.auth.getCurrentUser().id,
      "projectId": this.projectid,
      "datebid": new Date()
    }
    console.log(data);
    this.projectService.bidproject(data).subscribe((res) => {
      console.log ("BidProject: ", res);
    });
  }
}
