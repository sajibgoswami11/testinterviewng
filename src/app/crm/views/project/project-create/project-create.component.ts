import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, Validators, FormGroup, FormArray} from '@angular/forms';
import { EncryptionDescryptionService } from '../../../services/encryption-descryption.service';
import { TeamListService } from '../../../services/team-list.service';
import { StatusListService } from '../../../services/status-list.service';
import { EmployeeListService } from '../../../services/employee-list.service';
import { EMLINK } from 'constants';
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

    CreateProject: FormGroup ;
    encryptCreateProject: FormGroup;
    encryptProjectId: FormGroup;
    public onCheck = false;
    public show = false;

    public TaskAssignId: any;
    public Priority: any;
    public ddstatus: any;
    currentId = 0;

    public employeeList: any;
    public projectEmployeeList: any;
    dropdownSettings: any = {};
    teamWiseEmployee: any = [];
    public progressStatus: any;
    crearedProjectId: any;
    public readOnlyMode = false;

  constructor(
    private router: Router,
    private project: ProjectService,
    private module: ModuleService,
    private team: TeamListService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private encObj: EncryptionDescryptionService,
    private status: StatusListService,
    private employee: EmployeeListService
    ) {}

  ngOnInit(): void {

    this.CreateProject = this.fb.group({
      projectName: ['', Validators.required],
      projectMilestones: ['', Validators.required],
      projectprogressStatus: [''],
      projectEmployeeList: [''],
      moduleRows: this.fb.array([this.initModuleRows()])
    });

    this.employee.getEmployeeList().subscribe(
      responseEmployee => {
        this.employeeList = responseEmployee.empList;
       // console.log(this.employeeNames);
      });

    this.dropdownSettings = {
        // singleSelection: false,
         idField: 'empId',
         textField: 'empName',
         selectAllText: 'Select All',
         unSelectAllText: 'UnSelect All',
         itemsShowLimit: 10,
         allowSearchFilter: true
       };

    this.status.GetStatusList()
    .subscribe(
      responseStatus => {
        this.progressStatus = responseStatus.statusDetails;

      }
    );
  }

  onModuleDateExceed(e)
  {
    if (e.target.value  > this.CreateProject.get('projectMilestones')!.value)
    {
      this.toastr.error('Please give date inside project milestone', 'Error!');
      e.target.value = Date.now();
      return;
    }
  }

  onItemSelect(item: any) {
    // tslint:disable-next-line: forin
    this.teamWiseEmployee.push(
      { emp: this.encObj.encryptData(item.empId)});
    return this.teamWiseEmployee ;
  }


  onSelectAll(items: any) {
    this.teamWiseEmployee = [];
    const count = items.length;
    // tslint:disable-next-line: forin
    for (const i in items)
    {
      this.teamWiseEmployee.push(
        { emp: this.encObj.encryptData(items[i].empId)
        });
    }
    // console.log(this.teamWiseEmployee);
    return this.teamWiseEmployee ;
  }

  get formArr() {
    return this.CreateProject.get('moduleRows') as FormArray;
  }

  initModuleRows() {
    return this.fb.group({
      moduleName: [''],
      moduleEmployeeList: [''],
      moduleMilestones: [''],
      progressStatus: ['']
    });
  }

  addNewRow() {
    this.formArr.push(this.initModuleRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  moduleEncryptValue() {
    const moduleListEncrypt: any[] = [];
    const list = this.CreateProject.value.moduleRows;
    // tslint:disable-next-line:only-arrow-functions
    // tslint:disable-next-line: forin
    for (const i in list) {
      moduleListEncrypt.push(
        {
          projectId: this.encObj.encryptData(this.crearedProjectId),
          moduleName: this.encObj.encryptData(list[i].moduleName),
          milestones: this.encObj.encryptData(list[i].moduleMilestones),
          progressStatus: this.encObj.encryptData(list[i].progressStatus),
          empList:  this.moduleEncryptEmployee([list[i].moduleEmployeeList])
        });
    }
    return moduleListEncrypt;
  }

  moduleEncryptEmployee([empList]){
    const modulELempListEncrypt: any[] = [];
    // tslint:disable-next-line:forin
    for (const m in empList){
      modulELempListEncrypt.push({
        emp: this.encObj.encryptData(empList[m].empId)
      });
    }

    return modulELempListEncrypt;
  }

  onSelectProgress(e) {
    this.ddstatus = e.target.value;
  }

  onCheckModuleShow(val) {
    if (val.target.checked) {
      if (this.CreateProject.get('projectName')!.invalid) {
        this.toastr.error('Please Input projectName', 'Error!');
        return;
      }

      if (this.CreateProject.get('projectMilestones')!.invalid) {
        this.toastr.error('Please Input project Milestones', 'Error!');
        return;
      }
      if (this.CreateProject.get('projectprogressStatus')!.invalid) {
        this.toastr.error('Please Input projectprogressStatus', 'Error!');
        return;
      }

      if (this.CreateProject.get('projectEmployeeList')!.invalid) {
        this.toastr.error('Please Input Employee', 'Error!');
        return;
      }
      if (!this.onCheck){
        this.encryptCreateProject = this.fb.group({
          projectName: this.encObj.encryptData(this.CreateProject.get('projectName')!.value),
          milestone: this.encObj.encryptData(this.CreateProject.get('projectMilestones')!.value),
          progressStatus: this.encObj.encryptData(this.CreateProject.get('projectprogressStatus')!.value),
          empList: [this.teamWiseEmployee]
        });

        this.project.createProject(this.encryptCreateProject.value)
        .subscribe(
          success =>
          {
            this.crearedProjectId = success.project;
            this.encryptProjectId = this.fb.group({
              ProjectId: this.encObj.encryptData(success.project)
              });

            this.employee.GetEmployeeByProjectModule(this.encryptProjectId.value).subscribe(
              responseEmployee => {
                this.projectEmployeeList = responseEmployee.empList;
              });
            this.toastr.success(success.message, 'Success!');
          },
          error => {
            console.log(error);
            this.toastr.error(error.error, 'Error!');
          } );
        this.onCheck = true;
        this.show = true;
        this.readOnlyMode = true;
        this.CreateProject.controls.projectprogressStatus.enable();
      }
    } else {
      this.show = false;
    }
  }

  onSubmit(){
    if (this.CreateProject.get('projectName')!.invalid) {
      this.toastr.error('Please Input projectName', 'Error!');
      return;
    }

    if (this.CreateProject.get('projectMilestones')!.invalid) {
      this.toastr.error('Please Input project Milestones', 'Error!');
      return;
    }
    if (this.CreateProject.get('projectprogressStatus')!.invalid) {
      this.toastr.error('Please Input projectprogressStatus', 'Error!');
      return;
    }

    if (this.CreateProject.get('projectEmployeeList')!.invalid) {
      this.toastr.error('Please Input Employee', 'Error!');
      return;
    }

    if (!this.onCheck){
      this.encryptCreateProject = this.fb.group({
        projectName: this.encObj.encryptData(this.CreateProject.get('projectName')!.value),
        milestone: this.encObj.encryptData(this.CreateProject.get('projectMilestones')!.value),
        progressStatus: this.encObj.encryptData(this.CreateProject.get('projectprogressStatus')!.value),
        empList: [this.teamWiseEmployee]
      });

      this.project.createProject(this.encryptCreateProject.value)
      .subscribe(
        success =>
        {
          this.crearedProjectId = success.project;
          this.router.navigate(['/project/list']);
          this.toastr.success(success.message, 'Success!');
        },
        error => {
          this.toastr.error(error.error, 'Error!');
        } );
      console.log(this.encryptCreateProject.value);
    }else{
      console.log(this.crearedProjectId);
      this.module.createModule(this.moduleEncryptValue())
      .subscribe(
        success =>
        {
          this.CreateProject.reset();
          this.router.navigate(['/project/list']);
          this.toastr.success(success.message, 'Success!');
          this.onCheck = false;
          this.show = false;
        },
        error => {
          this.toastr.error(error.error, 'Error!');
        } );
    }
  }

}
