import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EncryptionDescryptionService } from 'src/app/task-management/services/encryption-descryption.service';
import { ModuleService } from 'src/app/task-management/services/module.service';
import { ProjectService } from 'src/app/task-management/services/project.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2';
import { TeamListService } from 'src/app/task-management/services/team-list.service';
import { StatusListService } from 'src/app/task-management/services/status-list.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})

export class ModuleListComponent implements OnInit {
  progressStatus: any;
  public teamList: any;
  encryptModule: FormGroup;
  moduledata: Array<any>;
  totalRecords: number;
  pageNumber = 1;
  pageSize = 10;
  constructor(private module: ModuleService,
              private project: ProjectService,
              private status: StatusListService,
              private team: TeamListService,
              private fb: FormBuilder,
              private router: Router,
              private encObj: EncryptionDescryptionService,
              private toastr: ToastrService) {
    // this.data=new Array<any>();
    this.module.getModuleList()
      .subscribe(
        responseSuccess => {
          if (!responseSuccess.data) {
            this.toastr.error('Data not found');
          }
          // console.log(responseSuccess.module);
          this.moduledata = responseSuccess.module;
          this.totalRecords = responseSuccess.length;
        },
        responseError => {
          // console.log(responseError.message);
          this.toastr.error(responseError.message);
        });
  }
  public projectList: any;
  ngOnInit(): void {

    this.project.getProjectList().subscribe(
      responseproject => {
        this.projectList = responseproject.project;
        console.log(this.projectList);
      }
    );
    this.team.getTeamList()
    .subscribe(
      responseForTeamdd => {
        this.teamList = responseForTeamdd.taskTeam;
        console.log(responseForTeamdd.taskTeam);
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

  pageChanged($event) {
    this.pageNumber = $event;
  }

  editModule(id: any) {
    this.router.navigate(['/module/edit/', { id }]);
    // this.toastr.info(id);
    // console.log( id ) ;
  }

  deleteModule(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      showCancelButtonText: 'No, keep it'
    })
      .then((result) => {
        this.encryptModule = this.fb.group({
          moduleId: this.encObj.encryptData(id)
        });
        if (result.value) {
          this.module.deleteModule(this.encryptModule.value)
            .subscribe(
              responseSuccess => {
                if (responseSuccess.data) {
                  this.module.getModuleList().subscribe(
                    // tslint:disable-next-line:no-shadowed-variable
                    responseSuccess => {
                      if (!responseSuccess.data) {
                        this.toastr.error('Data not found');
                      }
                      this.moduledata = responseSuccess.module;
                      this.totalRecords = responseSuccess.length;
                    },
                    responseError => {
                      // console.log(responseError.message);
                      this.toastr.error(responseError.message);
                    });
                }
                this.toastr.success(responseSuccess.module);
                this.router.navigate(['/module/list']);
              },
              responseError => {
                // console.log(responseError.message);
                this.toastr.error(responseError.message);
              }
            );
        }
      });
  }
}
