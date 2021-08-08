import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { ProjectService } from '../project.service';

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

  ngOnInit(): void {
  }

}
