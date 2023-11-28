import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeListService } from '../../../services/employee-list.service';
import { Router } from '@angular/router';
import { EncryptionDescryptionService } from '../../../services/encryption-descryption.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { threadId } from 'worker_threads';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-access-policy-list',
  templateUrl: './access-policy-list.component.html',
  styleUrls: ['./access-policy-list.component.scss']
})
export class AccessPolicyListComponent implements OnInit {
  userWiseMenuCreateForm!: FormGroup;
  encryptForm!: FormGroup;
  totalRecords!: number;
  pageNumber :any;
  pageSize = 5;
  pageSizeUser = 5;
  public roleWiseMenuData:any;
  userWiseMenuData: any;
  userGroupList: any;
  ddUserGroup: any;
  ddGroupAccessMenu: any;
  dropdownSettings!: {
    singleSelection: true,
    idField: string; textField: 
    string; selectAllText: string; 
    unSelectAllText: string; 
    itemsShowLimit: number; 
    allowSearchFilter: boolean;
  };
  encryptMenu: any;
  ddGroupWiseMenu: any;
  itemWiseMenu: any;
  encryptuserWiseMenuCreateForm!: FormGroup;

  constructor(private toastr: ToastrService,
              private employee: EmployeeListService,
              private fb: FormBuilder,
              private router: Router,
              private encObj: EncryptionDescryptionService ) {
      // role menu
      this.employee.getRoleWiseMenu().subscribe(
        responseRoleMenu => {
          this.roleWiseMenuData = responseRoleMenu.groupAccessMenu;
         // console.log(responseRoleMenu);
      },
        responseError => {
          this.toastr.error(responseError.message);
      });

     }

  ngOnInit() {
    this.dropdownSettings = {
       singleSelection: true,
       idField: 'userMenuId',
       textField: 'userMenuTitle',
       selectAllText: 'Select All',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 10,
       allowSearchFilter: true
     };
    this.userWiseMenuCreateForm = this.fb.group({
      userGroupList: [],
      ddGroupAccessMenu: [],
      ddGroupWiseMenu: [],
      menuTitle: [],
      menuPath: [],
      menuType: []
    });

    this.employee.getUserGroup().subscribe(
       responseUserGroup => {

          this.userGroupList = responseUserGroup.usersGroupList;
       } );
    const dropdwnForGroupAccessMenu : any[] = [];
    this.encryptForm = this.fb.group(
      { userMenuId: this.encObj.encryptData('') }
    );
    this.employee.getGroupWisemenu(this.encryptForm.value).subscribe(
        responseRes => {
          // console.log(responseRes);
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < responseRes.accessMenu.length; i++)
          {
            dropdwnForGroupAccessMenu.push({
              userMenuId: responseRes.accessMenu[i].userMenuId,
              userMenuTitle: responseRes.accessMenu[i].userMenuTitle
            });
          }
          this.ddGroupAccessMenu = dropdwnForGroupAccessMenu;
        });
  }
  
  pageChanged(event:any ){
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.pageNumber = parseInt(event);
  }
  editMenu(id:any)
  {
    const idNum = parseInt(id);
    this.router.navigate(['/accesspolicy/systemMenuUpdate', { idNum }]);
  }


//#region encrypt form value

encryptMenuId(menuList: { userMenuId: string }[]){

  const menuListEncrypt : any[]= [];
  for (const m in menuList){
    // console.log(menuList[m]);
    menuListEncrypt.push({
      userMenuId: this.encObj.encryptData(menuList[m].userMenuId)
    });
  }
  return menuListEncrypt;
}

//#endregion

  onSubmit()
  {
    const parentMenuitem =  this.userWiseMenuCreateForm.get('ddGroupAccessMenu')!.value;
    this.encryptForm = this.fb.group(
        {
          parentMenuId: this.encObj.encryptData(parentMenuitem[0].userMenuId),
          userMenuTitle: this.encObj.encryptData(this.userWiseMenuCreateForm.get('menuTitle')!.value),
          userMenuFile: this.encObj.encryptData(this.userWiseMenuCreateForm.get('menuPath')!.value),
          menuType: this.encObj.encryptData(this.userWiseMenuCreateForm.get('menuType')!.value)
        });
    console.log(this.encryptForm.value);
    this.employee.insertSystemMenu(this.encryptForm.value).subscribe(
      successResponse => {
          this.toastr.success(successResponse.data);
          this.userWiseMenuCreateForm.reset();
        },
        errorResponse => {
          this.toastr.error(errorResponse.message);
        }
      );
  }

}
