import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModuleService } from 'src/app/task-management/services/module.service';
import { EncryptionDescryptionService } from 'src/app/task-management/services/encryption-descryption.service';
import { ProjectService } from 'src/app/task-management/services/project.service';
import { TeamListService } from 'src/app/task-management/services/team-list.service';
import { Router } from '@angular/router';
import { StatusListService } from 'src/app/task-management/services/status-list.service';

@Component({
  selector: 'app-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.css']
})
export class ModuleCreateComponent implements OnInit {
  CreateModule: FormGroup;
  encryptmodule: FormGroup;

  constructor( private fb: FormBuilder, private module: ModuleService,
               private project: ProjectService,
               private encryptObj: EncryptionDescryptionService,
               private router: Router,
               private status: StatusListService,
               private team: TeamListService,
               private toastr: ToastrService)
  {  }

  public progressStatus: any;
  public projectName: any;
  public ddProjectId: any;
  public teamList: any;
  public ddTeamId: any;
  public show = false;
  public ddstatus: any;
    ngOnInit(): void
   {
      this.CreateModule = this.fb.group({
        moduleName: ['', [Validators.required]],
        milestones: ['', [Validators.required]],
        progressStatus: ['', [Validators.required]],
        projectName: ['', [Validators.required]],
        teamList: ['', [Validators.required]]
      });
      this.project.getProjectList().subscribe(
        responseproject => {this.projectName = responseproject.project;
                            console.log(responseproject);
                });
      this.team.getTeamList()
                .subscribe(
                  responseForTeamd => {
                    this.teamList = responseForTeamd.taskTeam;
                  }
                );
      this.status.GetStatusList()
                .subscribe(
                  responseStatus => {
                    this.progressStatus = responseStatus.statusDetails;
                    console.log(responseStatus);

                  }
                );
    }

    onSelectProject(e) {
      this.ddProjectId = e.target.value;
    }
    onSelectTeam(e) {
      this.ddTeamId = e.target.value;
    }

    onSelectProgress(e) {
      this.ddstatus = e.target.value;
    }
// field hide show checjlk box fucnctions
    onCheckTeamShow(val) {
      if (val.target.checked) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
//

    onSubmit() {

      if (this.CreateModule.get('projectName').invalid) {
        this.toastr.error('Please Input projectName', 'Error!');
        return;
      }
      if (this.CreateModule.get('milestones').invalid) {
        this.toastr.error('Please Input module Milestone', 'Error!');
        return;
      }
      if (this.CreateModule.get('progressStatus').invalid) {
        this.toastr.error('Please Input progress Status', 'Error!');
        return;
      }

      if (this.ddProjectId == null){
        this.ddProjectId = (this.CreateModule.get('projectName').value);
        console.log(this.ddProjectId);
      }
      if (this.ddstatus == null){
        this.ddstatus = (this.CreateModule.get('progressStatus').value);
       // console.log(this.EditTaskActivity.get('statusName').value);
       // console.log(this.ddstatus);
      }
      if (this.ddTeamId == null){
        this.ddTeamId = (this.CreateModule.get('teamList').value);
        console.log(this.ddTeamId);
      }

      this.encryptmodule = this.fb.group({
        moduleName : this.encryptObj.encryptData(this.CreateModule.get('moduleName').value),
        milestones : this.encryptObj.encryptData(this.CreateModule.get('milestones').value),
        progressStatus : this.encryptObj.encryptData(this.ddstatus),
        projectId : this.encryptObj.encryptData(this.ddProjectId),
         teamId: this.encryptObj.encryptData(this.ddTeamId)
      });
      console.log(this.encryptmodule.value);
      this.module.createModule(this.encryptmodule.value)
      .subscribe(
        success =>
        {
          this.CreateModule.reset();
          this.router.navigate(['/module/list']);
          this.toastr.success(success.message, 'Success!');
        },
        error => {
          console.log(error);
          this.toastr.error(error.error, 'Error!');
        } );

    }
}
