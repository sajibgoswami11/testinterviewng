import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TeamListService } from 'src/app/crm/services/team-list.service';
import { EmployeeListService } from 'src/app/crm/services/employee-list.service';
import { EncryptionDescryptionService } from 'src/app/crm/services/encryption-descryption.service';
import { ModuleService } from 'src/app/crm/services/module.service';
import { ProjectService } from 'src/app/crm/services/project.service';
import { StatusListService } from 'src/app/crm/services/status-list.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  encryptModule: FormGroup= new FormGroup({});
  progressStatus: any;
  ddstatus: any;
  public modStat: string|any;
  public projectEmployeeList: any;
  dropdownSettings: any = {};
  teamWiseEmployee: any;
  projectWiseEmployee: any = [];
  encObj: any;
  moduleList: any;
  selectedItems: any;
  projectEmployee: any;
  onCheck = false;
  projectId: string|any;
  public flagCheckDeselect = false ;
  encryptProject: FormGroup;
  EditProject: FormGroup= new FormGroup({});
  constructor(
    private router: Router,
    private team: TeamListService,
    private project: ProjectService,
    private module: ModuleService,
    private activeRoute: ActivatedRoute,
    private status: StatusListService,
    private employeeList: EmployeeListService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private encryptObj: EncryptionDescryptionService,
    private employee: EmployeeListService,private fb: FormBuilder
  ) {
    
    const id: any = this.activeRoute.snapshot.paramMap.get('id');
    const encryptProjectId = this.encryptObj.encryptData(id);
    this.encryptProject = this.formBuilder.group({
      ProjectId: encryptProjectId
    });

    // this.employee.GetEmployeeByProjectModule(this.encryptProject.value).subscribe(
    //   responseEmployee => {
    //      this.projectEmployeeList = responseEmployee.empList;
    //      this.modEmp = responseEmployee.empList;

    //   });

    this.project.getProjectById(this.encryptProject.value)
      .subscribe(
        successResponse => {
          if (!successResponse.data) {
            this.toastr.error('Data not found');
          }

          this.employee.GetEmployeeByProjectModule(this.encryptProject.value).subscribe(
            responseEmployee => {
               this.projectEmployee = responseEmployee.empList;
               this.EditProject.patchValue({
                projectID: successResponse.project.projectId,
                projectName: successResponse.project.projectName,
                projectMilestones: successResponse.project.milestone,
                teamName: successResponse.project.teamId,
                progressStatus:  successResponse.project.progressStatus,
                projectEmployeeList: this.projectEmployee
              });
            });
        },
        responseError => {
          this.toastr.error(responseError.message);
        }
      );

  }

  
  // public visibility = false;
  public teamName: any;
  public ddTeamId: any;
  public show = false;
  modEmp: any;
  ngOnInit(): void {
    this.EditProject = this.formBuilder.group({
      projectID: ['', [Validators.required]],
      projectName: ['', [Validators.required]],
      projectMilestones: ['', [Validators.required]],
      teamName: ['', [Validators.required]],
      progressStatus: ['', [Validators.required]],
      projectEmployeeList: [''],
      moduleRows: this.formBuilder.array([this.initModuleRowsEdit('', '', '', '', '')])
    });

    this.module.getModuleByProject(this.encryptProject.value)
      .subscribe(
        successResponseModule => {
          this.moduleList = successResponseModule.module;

          if (this.moduleList.length > 0){
              this.deleteRow(0);
          }
          else
          {
            this.employee.GetEmployeeByProjectModule(this.encryptProject.value).subscribe(
              responseEmployee => {
                 this.projectEmployeeList = responseEmployee.empList;
                 this.modEmp = responseEmployee.empList;

              });
          }
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.moduleList.length; i++)
          {
            const encryptModuleId = this.encryptObj.encryptData(this.moduleList[i].moduleId);
            this.encryptModule = this.formBuilder.group({
                    moduleId: encryptModuleId
            });

            this.employeeList.GetEmployeeByProjectModule(this.encryptModule.value).subscribe(
              resultModuleWiseEmp => {
                this.modEmp = resultModuleWiseEmp.empList;
                this.projectEmployeeList = resultModuleWiseEmp.empList;
                
                this.formArr.push(this.initModuleRowsEdit(this.moduleList[i].moduleId, this.moduleList[i].moduleName,
                  this.moduleList[i].milestones, this.moduleList[i].progressStatus, resultModuleWiseEmp.empList ));
              }
            );
            console.log(this.projectEmployeeList);
            console.log(this.modEmp);
            this.employee.GetEmployeeByProjectModule(this.encryptProject.value).subscribe(
              responseEmployee => {
                 this.projectEmployeeList = responseEmployee.empList;

              });
             
          }
        });

    this.status.GetStatusList()
    .subscribe(
      responseStatus => {
        this.progressStatus = responseStatus.statusDetails;

      }
    );

    this.dropdownSettings = {
      // singleSelection: false,
       idField: 'empId',
       textField: 'empName',
       selectAllText: 'Select All',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 10,
       allowSearchFilter: true
     };
  }

//#region projectForm
onItemProjectSelect(item: any) {
  const count = item.length;
  for (let i = 0; i < count; i++)
  {
     this.projectWiseEmployee.push(
    { emp: item[i].empId});
  }
  // console.log(this.projectWiseEmployee);
  return this.projectWiseEmployee ;
}

onSelectProjectAll(items: any) {
  this.projectWiseEmployee = [];
  const count = items.length;
  for (let i = 0; i < count; i++)
  {
    this.projectWiseEmployee.push(
      { emp: items[i].empId}
      );
  }
  // console.log(this.projectWiseEmployee);
}

onProjectDeSelect(items: any){
  const count = this.projectWiseEmployee.length;
  const serviceCount = this.projectEmployee.length;
  const moduleCount = this.moduleList.length;
  const projectEmpSelected = [];
  const projectEmpDeSelected = [];
 //#region project deselect validation
  for (let i = 0; i < moduleCount; i++)
    {
      const encryptModuleId = this.encryptObj.encryptData(this.moduleList[i].moduleId);
      this.encryptModule = this.formBuilder.group({
              moduleId: encryptModuleId
      });
      this.employeeList.GetEmployeeByProjectModule(this.encryptModule.value).subscribe(
        resultModuleWiseEmp => {
          if (resultModuleWiseEmp.empList.find((value:any) => value.empId === items.empId) )
          {
            this.flagCheckDeselect = true ;
            console.log(this.flagCheckDeselect);
            this.toastr.error('Already assigned in module. Please reload', 'Error!');
          }
        }
        );
    }
  //#endregion project deselect validation
  if (count !== 0){
    for (let i = 0; i < count; i++)
    {
      if (items.empId !== this.projectWiseEmployee[i].emp){
        projectEmpSelected.push(
          { emp: this.projectWiseEmployee[i].emp}
          );
      }
    }
  }else{
    for (let i = 0; i < serviceCount; i++)
    {
      if (items.empId !== this.projectEmployee[i].empId){
        projectEmpSelected.push(
          { emp: this.projectEmployee[i].empId}
          );
      }
    }
  }
  projectEmpDeSelected.push(
        {emp: items.empId}
    );
  console.log(projectEmpDeSelected);
  console.log(projectEmpSelected);
  this.projectWiseEmployee = [];
  this.projectWiseEmployee = projectEmpSelected;
}

//#endregion

//#region module form

onItemSelect(item: any) {
  const count = item.length;
  for (let i = 0; i < count; i++)
  {
     this.teamWiseEmployee.push(
    { emp: this.encObj.encryptData(item[i].empId)});
  }
  return this.teamWiseEmployee ;
}


onSelectAll(items: any) {
  this.teamWiseEmployee = [];
  const count = items.length;
  for (let i = 0; i < count; i++)
  {
    this.teamWiseEmployee.push(
      { emp: this.encObj.encryptData(items[i].empId)
      });
  }
  console.log(this.teamWiseEmployee);
  return this.teamWiseEmployee ;
}
get formArr() {
  return this.EditProject.get('moduleRows') as FormArray;
}

initModuleRowsEdit(moduleId: string, moduleName: string, milestone: string, progressStatus: string, moduleEmployeeList: string) {
  return this.formBuilder.group({
    moduleId: [moduleId],
    moduleName: [moduleName],
    moduleEmployeeList: [moduleEmployeeList],
    moduleMilestones: [milestone],
    progressStatus: [progressStatus]
  });
}



addNewRow() {
  this.formArr.push(this.initModuleRowsEdit('', '', '', '', ''));
}

deleteRow(index: number) {
  this.formArr.removeAt(index);
}

moduleEncryptValue() {
  const moduleListEncrypt = [];
  const list = this.EditProject.value.moduleRows;
  // tslint:disable-next-line:forin
  for (const i in list) {
      if (typeof list[i].progressStatus !== undefined && list[i].progressStatus )
        {
          this.modStat = list[i].progressStatus;
        }
        else{ this.modStat = ''; }
      moduleListEncrypt.push(
        {
          projectId: this.encryptObj.encryptData(this.EditProject.get('projectID')!.value),
          moduleId: this.encryptObj.encryptData(list[i].moduleId),
          moduleName: this.encryptObj.encryptData(list[i].moduleName),
          milestones: this.encryptObj.encryptData(list[i].moduleMilestones),
          progressStatus: this.encryptObj.encryptData(this.modStat),
          empList:  this.moduleEncryptEmployee([list[i].moduleEmployeeList])
        });
  }
  console.log(moduleListEncrypt);
  return moduleListEncrypt;
}

moduleEncryptEmployee(empList:any[]){
  const modulELempListEncrypt = [];
  // tslint:disable-next-line:forin
  for (const m in empList){
    modulELempListEncrypt.push({
      emp: this.encryptObj.encryptData(empList[m].empId)
    });
  }

  return modulELempListEncrypt;
}
//#endregion

  onSelectTeam(e:any) {
    this.ddTeamId = e.target.value;
  }
  onSelectProgress(e:any) {
    this.ddstatus = e.target.value;
  }

  onCheckTeamShow(val:any) {
    if (val.target.checked) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  onModuleDateExceed(e:any)
  {
    if (e.target.value  > this.EditProject.get('projectMilestones')!.value)
    {
      this.toastr.error('Please give date inside project milestone', 'Error!');
      e.target.value = Date.now();
      return;
    }
  }
  onProjectDateExceed($event: any , moduleFormArr: any){
    const targetValue = $event.target?.value as number; 
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < moduleFormArr.length; i++) {
      console.log(moduleFormArr[i].value.moduleMilestones);
      // tslint:disable-next-line: no-string-literal
      if (targetValue < moduleFormArr[i].value.moduleMilestones) {
        this.toastr.error('Please give date greater than module milestone', 'Error!');
        $event.target.value = Date.now();
        return;
      }
    }

  }
  onSubmit() {

    if (this.EditProject.get('projectName')!.invalid) {
      this.toastr.error('Please Input projectName', 'Error!');
      return;
    }
    if (this.EditProject.get('projectMilestones')!.invalid) {
      this.toastr.error('Please Input projectMilestones', 'Error!');
      return;
    }


    if (this.EditProject.get('progressStatus')!.invalid) {
      this.toastr.error('Please Input progress Status', 'Error!');
      return;
    }

    //#region Project EmployeeList Encryption
    const count = this.projectWiseEmployee.length;
    const serviceCount = this.projectEmployee.length;
    const projectEmpSelected = [];

    if (count > 0){
      for (let i = 0; i < count; i++)
      {
        projectEmpSelected.push(
          { emp: this.encryptObj.encryptData(this.projectWiseEmployee[i].emp)}
          );
      }
    }else{
      for (let i = 0; i < serviceCount; i++)
      {
        projectEmpSelected.push(
          { emp: this.encryptObj.encryptData(this.projectEmployee[i].empId)}
          );
      }
    }
    //#endregion

    this.encryptProject = this.formBuilder.group({
      projectName: this.encryptObj.encryptData(this.EditProject.get('projectName')!.value),
      milestone: this.encryptObj.encryptData(this.EditProject.get('projectMilestones')!.value),
      projectId: this.encryptObj.encryptData(this.EditProject.get('projectID')!.value),
      progressStatus: this.encryptObj.encryptData(this.EditProject.get('progressStatus')!.value),
      EmpList: [projectEmpSelected]
    });
    // console.log(this.encryptProject.value);
    if (this.flagCheckDeselect)
    {
      this.flagCheckDeselect = false;
      location.reload();
    }
     else
     {
      this.project.EditProject(this.encryptProject.value)
        .subscribe(
          successResponse => {
            this.toastr.success(successResponse.data);
            this.projectId = successResponse.project;
          },
          errorResponse => {
            this.toastr.error(errorResponse.error);
          }
        );

      if (this.projectId !== ''){
        this.module.createModule(this.moduleEncryptValue())
          .subscribe(
            success =>
            {
              // this.router.navigate(['/project/list']);
              this.toastr.success(success.message, 'Success!');
              // this.onCheck = false;
              // this.show = false;
            },
            error => {
              this.toastr.error(error.error, 'Error!');
          } );
      }
    }
  }
}
