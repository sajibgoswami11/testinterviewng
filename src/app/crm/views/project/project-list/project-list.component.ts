import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptionDescryptionService } from '../../../services/encryption-descryption.service';
import { TeamListService } from '../../../services/team-list.service';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var Swal: any;


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public teamList: any;
  data: any;
  totalRecords: number;
  pageNumber = 1;
  pageSize = 10;
  public encryptProject: FormGroup = new FormGroup({});
  constructor(private project: ProjectService,
              private team: TeamListService,
              private router: Router,
              private fb: FormBuilder,
              private encObj: EncryptionDescryptionService,
              private toastr: ToastrService) {
    this.totalRecords = 0;
    // this.data=new Array<any>();
    this.project.getProjectList()
      .subscribe(
        responseSuccess => {
         // console.log(responseSuccess);
          if (!responseSuccess.data) {
            this.toastr.error('Data not found');
          }
          this.data = responseSuccess.project;
          this.totalRecords = responseSuccess.length;
        },
        responseError => {
          // console.log(responseError.message);
          this.toastr.error(responseError.message);
        });

  }

  ngOnInit(): void {

    // this.team.getTeamList()
    //   .subscribe(
    //     responseForTeamdd => {
    //       this.teamList = responseForTeamdd.taskTeam;
    //      // console.log(responseForTeamdd.taskTeam);
    //     }
    //   );
  }

  pageChanged($event:number) {
    this.pageNumber = $event;
  }

  editProject(id: any) {
    this.router.navigate(['/project/edit', { id }]);
    // this.toastr.info(id);
    // console.log(id);
  }

  deleteProject(id:any) {
    // var projectId = this.encObj.encryptData(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      showCancelButtonText: 'No, keep it'
    }).then((result:any) => {
      this.encryptProject = this.fb.group({
        ProjectId: this.encObj.encryptData(id)
      });
      if (result.value) {
        this.project.deleteProject(this.encryptProject.value)
          .subscribe(
            responseSuccessDelete => {
              Swal.fire('Deleted!', responseSuccessDelete.message, 'success')
              .then(() => {
                  location.reload();
                });
            },
            responseError => {
              console.log(responseError.message);
              this.toastr.error(responseError.project);
            }
          );
      }
    });
  }
}
