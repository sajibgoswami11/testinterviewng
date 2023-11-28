import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionDescryptionService } from '../../../services/encryption-descryption.service';
import { EmployeeListService } from '../../../services/employee-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-access-policy-edit-system-menu',
  templateUrl: './access-policy-edit-system-menu.component.html',
  styleUrls: ['./access-policy-edit-system-menu.component.scss']
})
export class AccessPolicyEditSystemMenuComponent implements OnInit {
  EditSystemMenu :FormGroup = new FormGroup({});
  encryptSystemMenu: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private employee: EmployeeListService,
    private encryptObj: EncryptionDescryptionService,
    private toastr: ToastrService,
    private router: Router
  ) {
    const id: any = this.activeRoute.snapshot.paramMap.get('id');
    const encryptMenuId = this.encryptObj.encryptData(id);
    this.encryptSystemMenu = this.formBuilder.group({
      userMenuId: encryptMenuId
    });
    this.employee.getGroupWisemenu(this.encryptSystemMenu.value).subscribe(
      responseRes => {
            console.log(responseRes);

            this.EditSystemMenu.patchValue({
              userMenuTitle: responseRes.accessMenu[0].userMenuTitle,
              userMenuId : responseRes.accessMenu[0].userMenuId,
              userMenuFile : responseRes.accessMenu[0].userMenuFile
            });
      });
  }

  ngOnInit() {
    this.EditSystemMenu = this.formBuilder.group({
      userMenuId: [],
      userMenuTitle: [],
      userMenuFile: []
    });
  }

   onSubmit()
   {
     this.encryptSystemMenu = this.formBuilder.group(
       {
        userMenuId: this.encryptObj.encryptData(this.EditSystemMenu.get('userMenuId')?.value),
        userMenuTitle: this.encryptObj.encryptData(this.EditSystemMenu.get('userMenuTitle')?.value),
        userMenuFile: this.encryptObj.encryptData(this.EditSystemMenu.get('userMenuFile')?.value)
       });
     console.log(this.encryptSystemMenu.value);
     this.employee.updateSystemMenuById(this.encryptSystemMenu.value).subscribe({
            next:(successResponse: any) => {
              this.toastr.success(successResponse.accessMenu);
              this.router.navigate(['/accesspolicy/list']);
            },
            error:(errorResponse:any) => {
              this.toastr.error(errorResponse.error);
            }
      });
   }
}
