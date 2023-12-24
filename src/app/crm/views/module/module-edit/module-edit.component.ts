import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from 'src/app/task-management/services/module.service';
import { EncryptionDescryptionService } from 'src/app/task-management/services/encryption-descryption.service';
import { ProjectService } from 'src/app/task-management/services/project.service';
import { StatusListService } from 'src/app/task-management/services/status-list.service';
import { TeamListService } from 'src/app/task-management/services/team-list.service';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})

export class ModuleEditComponent implements OnInit {
  constructor(
    private module: ModuleService,
    private router: Router,
    private status: StatusListService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private encryptObj: EncryptionDescryptionService,
    private project: ProjectService,
    private team: TeamListService,
    ) {
         const id = this.activeRoute.snapshot.paramMap.get('id');
         const encryptModuleId = this.encryptObj.encryptData(id);
         this.encryptModule = this.fb.group({
          moduleId: encryptModuleId
    });
         console.log(encryptModuleId);
         this.module.getModuleById( this.encryptModule.value)
                    .subscribe(
                      responseSuccess => {
                       console.log(responseSuccess);
                       this.EditModule.patchValue({
                        modulEId: responseSuccess.module[0].moduleId,
                        modulEName: responseSuccess.module[0].moduleName,
                        milesTones: responseSuccess.module[0].milestones,
                        progressStatus: responseSuccess.module[0].progressStatus,
                        projectList: responseSuccess.module[0].projectId,
                        teamList: responseSuccess.module[0].teamId
                        });
                      },
                      error => {console.log(error); }
                      );
     }
  encryptModule: FormGroup;
  EditModule: FormGroup;

  public projectList: any;
  public ddProjectId: any;
  public teamList: any;
  public ddTeamId: any;
  public show = false;
  progressStatus: any;
  public ddstatus: any;

  ngOnInit(): void {
    this.EditModule = this.fb.group({
    modulEId: ['', [Validators.required]],
    modulEName: ['', [Validators.required]],
    milesTones: ['', [Validators.required]],
    progressStatus: ['', [Validators.required]], projectList: ['', [Validators.required]],
    teamList: ['', [Validators.required]]
  });
    this.project.getProjectList().subscribe(
    responseproject => {this.projectList = responseproject.project;
                       // console.log(responseproject);
            }
    );
    this.status.GetStatusList()
    .subscribe(
      responseStatus => {
        this.progressStatus = responseStatus.statusDetails;
      }
    );

    this.team.getTeamList()
    .subscribe(
      responseForTeamd => {
        this.teamList = responseForTeamd.taskTeam;
        console.log(responseForTeamd.taskTeam);
      }
    );

  }

    onSelectProgress(eProgress) {
      this.ddstatus = eProgress.target.value;
    }

    onSelectProject(eProject) {
      this.ddProjectId = eProject.target.value;
      console.log( eProject.target.value);
    }

    onSelectTeam(eTeam) {
      this.ddTeamId = eTeam.target.value;
    }

  onSubmit() {

    if (this.EditModule.get('projectList').invalid) {
      this.toastr.error('Please Input projectName', 'Error!');
      return;
    }

    if (this.EditModule.get('milesTones').invalid) {
      this.toastr.error('Please Input Milestone', 'Error!');
      return;
    }

    if (this.EditModule.get('progressStatus').invalid) {
      this.toastr.error('Please Input progress Status', 'Error!');
      return;
    }

    if (this.ddProjectId == null){
      this.ddProjectId = (this.EditModule.get('projectList').value);
    }

    if (this.ddstatus == null){
      this.ddstatus = (this.EditModule.get('progressStatus').value);
     // console.log(this.EditTaskActivity.get('statusName').value);
     // console.log(this.ddstatus);
    }

    if (this.ddTeamId == null){
      this.ddTeamId = (this.EditModule.get('teamList').value);
      console.log(this.ddTeamId);
    }

    console.log(this.ddProjectId);
    this.encryptModule = this.fb.group({
      moduleId : this.encryptObj.encryptData(this.EditModule.get('modulEId').value),
      moduleName  : this.encryptObj.encryptData(this.EditModule.get('modulEName').value),
      milestones : this.encryptObj.encryptData(this.EditModule.get('milesTones').value),
      progressStatus : this.encryptObj.encryptData(this.ddstatus),
      projectId : this.encryptObj.encryptData(this.ddProjectId),
      teamId: this.encryptObj.encryptData(this.ddTeamId)
    });
    console.log(this.encryptModule.value);
    this.module.editModule(this.encryptModule.value)
    .subscribe(
       data => {
        this.router.navigate(['/module/list']);
        this.toastr.success('Success!');
       },
       error => {
          this.toastr.error(error.error);
       }

    );
  }
}
