import { Component, OnInit } from '@angular/core';
// import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { EmployeeListService } from '../../../services/employee-list.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EncryptionDescryptionService } from '../../../services/encryption-descryption.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-privileges',
  templateUrl: './user-privileges.component.html',
  styleUrls: ['./user-privileges.component.scss']
})
export class UserPrivilegesComponent implements OnInit {
  public employeeList: any;
  public ddEmployee: any;
  userPrivileges!: FormGroup;
  encryptUserPrivileges!: FormGroup;
  public selectedItem: any;
   
  // items!: TreeviewItem[];
  values!: number[];
  // config = TreeviewConfig.create({
  //   hasAllCheckBox: true,
  //   hasFilter: true,
  //   hasCollapseExpand: true,
  //   decoupleChildFromParent: false,
  //   maxHeight: 500
  // });
  config:any;
  constructor(
    private employee: EmployeeListService,
    private encryptObj: EncryptionDescryptionService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userPrivileges = this.fb.group({
      employee: ['', Validators.required]
    });

    this.employee.getUserList().subscribe(
      responseEmployee => {
        this.employeeList = responseEmployee.usersList;
      });
  }

  onFilterChange(value: string): void {
    console.log('filter:', value);
  }

  // onSelectEmployee(event: Event) {
  //   const target = event.target as HTMLSelectElement;
  //   const value = target.value;
  //   this.ddEmployee = value;
  //   const encryptEmployee = this.fb.group({
  //     userRoleId : this.encryptObj.encryptData(value)
  //  });
  //   this.employee.RoleWiseMenu(encryptEmployee.value).subscribe(
  //     responseEmployee => {
  //       const menuItem :any[]= [];
  //       // tslint:disable-next-line:prefer-for-of
  //       for (let i = 0; i < responseEmployee.accessMenu.length; i++){
  //         menuItem.push(new TreeviewItem(responseEmployee.accessMenu[i]));
  //       }
  //       this.items = menuItem;
  //     });
  // }
  onSelectEmployee(event: Event) {
     const target = event.target as HTMLSelectElement;
     const value = target.value;}
     
  onSubmit(){
    const encryptEmployee = this.fb.group({
      userId : this.encryptObj.encryptData(this.userPrivileges.get('employee')!.value),
      menuId : [this.selectedItem]
   });
    console.log(encryptEmployee.value);

    // this.employee.PostUserWiseMenu(encryptEmployee.value).subscribe(
    //   responseEmployee => {
    //     // this.router.navigate(['/employee/list']);
    //     this.toastr.success('Success!');
    //  },
    //  error => {
    //     this.toastr.error(error.error);
    //   });
  }

  selected(data: any){
    const menuItem: any[] = [];
        // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++){
      menuItem.push({UserMenuId: this.encryptObj.encryptData(data[i])});
    }
    this.selectedItem = menuItem;
  }

}
