import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeListService } from '../../../services/employee-list.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionDescryptionService } from '../../../services/encryption-descryption.service';

@Component({
  selector: 'app-user-access-policy',
  templateUrl: './user-access-policy.component.html',
  styleUrls: ['./user-access-policy.component.scss']
})
export class UserAccessPolicyComponent implements OnInit {
  userWiseMenuCreateForm!: FormGroup;
  encryptMenu!: FormGroup;
  totalRecords!: number;
  pageNumber = 1;
  pageSize = 15;
  pageSizeUser = 5;
  public roleWiseMenuData: any;
  ddRoleWiseGroup: any;
  userGroupList: any;
  ddUserGroup: any;
  ddGroupAccessMenu: any;
  userList: any;
  userdropdownSettings!: {
    singleSelection: true;
    idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean;
  };
  dropdownSettings!: {
    singleSelection: true;
    idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean;
  };
  itemWiseMenu: any;
  ddGroupWiseMenu: any;
  menuDropdownSettings!: {
    // singleSelection: boolean;
    idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean;
  };
  encryptMenuForm!: FormGroup;
  userIdval: any;
  encryptForm!: FormGroup;
  ddGroupWiseMenuSelected!: any[];
  constructor(private toastr: ToastrService,
              private employee: EmployeeListService,
              private fb: FormBuilder,
              private router: Router,
              private encObj: EncryptionDescryptionService) {

                // user menu
                // this.employee.GetUserWiseAccessPolicyMenu().subscribe(
                //   responseUserMenu => {
                //     this.userWiseMenuData = responseUserMenu.userAccessMenu;
                //     console.log(responseUserMenu);
                // },
                //   responseError => {
                //     this.toastr.error(responseError.message);
                // });
              }

  ngOnInit() {
    this.userdropdownSettings = {
       singleSelection: true,
       idField: 'userId',
       textField: 'userName',
       selectAllText: 'Select All',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 10,
       allowSearchFilter: true
     };
    this.dropdownSettings = {
       singleSelection: true,
       idField: 'userMenuId',
       textField: 'userMenuTitle',
       selectAllText: 'Select All',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 10,
       allowSearchFilter: true
     };
    this.menuDropdownSettings = {
      idField: 'userMenuId',
      textField: 'userMenuTitle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.userWiseMenuCreateForm = this.fb.group({
      userList: [],
      userGroupList: [],
      ddRoleWiseGroup: [],
      ddGroupWiseMenu: []
    });

    this.employee.getUserGroup().subscribe(
       responseUserGroup => {
          this.userGroupList = responseUserGroup.usersGroupList;
       } );
    this.employee.getUserList().subscribe(
       responseUserList => {
          this.userList = responseUserList.usersList;
       } );
    const dropdwnForGroupAccessMenu: any[] = [];
    this.encryptForm = this.fb.group(
         { userMenuId: this.encObj.encryptData('') }
       );
    this.employee.getGroupWisemenu(this.encryptForm.value).subscribe(
           responseRes => {
             // console.log(responseRes);
             // tslint:disable-next-line: prefer-for-of
             for (let i = 0; i < responseRes.accessMenu.length; i++)
             {
                 dropdwnForGroupAccessMenu.push(
                  { userMenuTitle: responseRes.accessMenu[i].userMenuTitle,
                   userMenuId : responseRes.accessMenu[i].userMenuId }
                 );
             }
             this.ddGroupWiseMenu = dropdwnForGroupAccessMenu;
           });
  }
//
  onItemGroupSelect(item: any)
  {
    const userWiseMultiSelectData: any[] = [];
    this.employee.getRoleWiseMenu().subscribe(
      responseUserMenu => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < responseUserMenu.groupAccessMenu.length; i++)
        {
          if (item.target.value === responseUserMenu.groupAccessMenu[i].userGroupId){
             userWiseMultiSelectData.push(
               {
                userMenuId: responseUserMenu.groupAccessMenu[i].userMenuId,
                userMenuTitle: responseUserMenu.groupAccessMenu[i].userMenuTitle,
                userGroupId: responseUserMenu.groupAccessMenu[i].userGroupId,
                userGroupTitle: responseUserMenu.groupAccessMenu[i].userGroupTitle
               });
          }
        }
        const controlRoleWiseGroup = this.userWiseMenuCreateForm.get('ddRoleWiseGroup')!.value ;

        if (controlRoleWiseGroup !== null){
          this.userWiseMenuCreateForm.controls['ddRoleWiseGroup'].reset();
          for ( let i = 0; i < controlRoleWiseGroup.length; i++ ){
            controlRoleWiseGroup[i] = null;
            // this.ddRoleWiseGroup = null;
          }
        }
        console.log(controlRoleWiseGroup);
        // this.ddRoleWiseGroup = userWiseMultiSelectData;
        this.itemWiseMenu = userWiseMultiSelectData;
        this.userWiseMenuCreateForm.patchValue({
            ddGroupWiseMenu: this.itemWiseMenu
        });
        // console.log(item);
    },
      responseError => {
        this.toastr.error(responseError.message);
    });

  }

  onItemMenuSelectByGroup(item: any){
    this.encryptMenu = this.fb.group({
      userMenuId : this.encObj.encryptData(item.userMenuId)
    });
    this.employee.getGroupWisemenu(this.encryptMenu.value).subscribe(
      responseRes => {
        this.ddGroupWiseMenu = responseRes.accessMenu;
        // console.log(this.ddGroupWiseMenu);
      }
    );
  }

  //#region multiselect menu data fetch for group
  onItemMenuSelect(item: any)
  {
    // tslint:disable-next-line: prefer-const
    let itemMenuSelected :any[]= [];
    if (this.itemWiseMenu != null ) {
      this.itemWiseMenu.push(
        {userMenuId: item.userMenuId}
      );
    }
    else{
      itemMenuSelected.push(
        { userMenuId: item.userMenuId});
      this.itemWiseMenu = itemMenuSelected;
    }
    console.log(this.itemWiseMenu);
    return this.itemWiseMenu ;
  }

  onSelectMenuAll(items: any){
    this.itemWiseMenu = [];
    const count = items.length;
    for (let i = 0; i < count; i++)
    {
      this.itemWiseMenu.push(
        { userMenuId: items[i].userMenuId}
        );
    }
    // console.log(this.itemWiseMenu);
  }

  onMenuDeSelect(items: any){
    const count = this.itemWiseMenu.length;
    const serviceCount = this.ddGroupWiseMenu.length;
    const itemMenuSelected :any[] = [];
    const itemMenuDeSelected: any[] = [];
    if (count !== 0){
      for (let i = 0; i < count; i++)
      {
        if (items.userMenuId !== this.itemWiseMenu[i].userMenuId){
          itemMenuSelected.push(
            { userMenuId: this.itemWiseMenu[i].userMenuId}
            );
        }
      }
    }
    else{
      for (let i = 0; i < serviceCount; i++)
      {
        if (items.userMenuId !== this.ddGroupWiseMenu[i].userMenuId){
          itemMenuSelected.push(
            { userMenuId: this.ddGroupWiseMenu[i].userMenuId}
            );
        }
      }
    }
    itemMenuDeSelected.push(
      { userMenuId: items.userMenuId}
    );
    this.itemWiseMenu = [];
    this.itemWiseMenu = itemMenuSelected;
    console.log(itemMenuDeSelected);
    console.log(this.itemWiseMenu);
  }

  //#endregion

// dropdown for roles
  onSelectGroup(eUserGroup: { target: { value: any; }; })
  {
    this.ddUserGroup = eUserGroup.target.value ;

    // this.employee.getMenuData().subscribe(
    //   responseRes => {
    //     console.log(responseRes);
    //     tslint:disable-next-line: prefer-for-of
    //     for (let i = 0; i < responseRes.groupAccessMenu.length; i++)
    //     {
    //       if ( this.ddUserGroup === responseRes.groupAccessMenu[i].userGroupId)
    //       {
    //         this.ddGroupAccessMenu.push(
    //          { userMenuTitle: responseRes.groupAccessMenu[i].userMenuTitle,
    //           userMenuId : responseRes.groupAccessMenu[i].userMenuId }
    //         );
    //       }
    //     }
    //   });
  }


//#region encrypt form value

// moduleEncryptValue() {
//   const moduleListEncrypt = [];
//   // tslint:disable-next-line:forin

//   moduleListEncrypt.push(
//         {
//           // userId: this.encObj.encryptData(this.userWiseMenuCreateForm.get('userList').value),
//           userGroupId: (this.userWiseMenuCreateForm.get('userGroupList').value),
//           userMenuList: (this.userWiseMenuCreateForm.get('ddGroupWiseMenu').value)
//         });

//   // console.log(moduleListEncrypt);
//   return moduleListEncrypt;
// }

// encryptMenuId([menuList]){

//   const menuListEncrypt = [];
//   // tslint:disable-next-line:forin
//   for (const m in menuList){
//     // console.log(menuList[m]);
//     menuListEncrypt.push({
//      userMenuId: this.encObj.encryptData(menuList[m].userMenuId)
//     });
//   }
//   return menuListEncrypt;
// }

//#endregion



  onSubmit()
  {
    const items = this.userWiseMenuCreateForm.get('ddGroupWiseMenu')!.value;
    const menu :any[]= [];
    const count = items.length;
    // tslint:disable-next-line: forin
    for (const i in items)
    {
      menu.push(
        { userMenuId: this.encObj.encryptData(items[i].userMenuId)
        });
    }
    const userIdvalitem =  this.userWiseMenuCreateForm.get('userList')!.value;
    // console.log(this.moduleEncryptValue());

    // console.log(menu);
    this.encryptMenuForm = this.fb.group(
       {
        // userId: this.encObj.encryptData(userIdvalitem[0].userId),
        userGroupId: this.encObj.encryptData(this.userWiseMenuCreateForm.get('userGroupList')!.value),
        userMenuList: [menu]
       }
     );

    console.log(this.encryptMenuForm.value);
    this.employee.insertMenuforUser(this.encryptMenuForm.value).subscribe(
      successResponse => {
          this.toastr.success(successResponse.accessMenu);
          this.userWiseMenuCreateForm.reset();
        },
        errorResponse => {
          this.toastr.error(errorResponse.message);
        }
      );
  }

}
