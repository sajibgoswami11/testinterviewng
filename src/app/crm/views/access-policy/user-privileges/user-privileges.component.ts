import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { EmployeeListService } from 'src/app/crm/services/employee-list.service';
import { EncryptionDescryptionService } from 'src/app/crm/services/encryption-descryption.service';

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
  selectedNodes! : any;
  
  nodes: TreeNode[] = [];

 

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

    this.employee.getUserList().subscribe(responseEmployee => {
      this.employeeList = responseEmployee.usersList;
    });
  }

  onFilterChange(value: string): void {
    console.log('filter:', value);
  }

  onSelectEmployee(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.ddEmployee = value;
    const encryptEmployee = this.fb.group({
      userRoleId: this.encryptObj.encryptData(value)
    });

    this.employee.RoleWiseMenu(encryptEmployee.value).subscribe(responseEmployee => {
      // Assuming responseEmployee.accessMenu is an array of TreeNode
      
      this.nodes = responseEmployee.accessMenu;
    });

  }
    onNodeSelect(event: any): void {
    // Handle the selection of nodes
    console.log('Selected Nodes:', this.selectedNodes);
  }
  onSubmit(){
    const encryptEmployee = this.fb.group({
      userId : this.encryptObj.encryptData(this.userPrivileges.get('employee')!.value),
      menuId : [this.selectedItem]
   });
    console.log(this.selectedItem.value);

    // this.employee.PostUserWiseMenu(encryptEmployee.value).subscribe(
    //   responseEmployee => {
    //     // this.router.navigate(['/employee/list']);
    //     this.toastr.success('Success!');
    //  },
    //  error => {
    //     this.toastr.error(error.error);
    //   });
  }
  values:any;
  selected(values: Event){
    const menuItem: any[] = [];
    const target = values.target as HTMLSelectElement;
    for (let i = 0; i < target.value.length; i++){
      menuItem.push({UserMenuId: this.encryptObj.encryptData(target.value[i])});
    }
    this.selectedItem = menuItem;
  }

}




 