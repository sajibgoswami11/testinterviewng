import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeListService } from '../../../services/employee-list.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EncryptionDescryptionService } from '../../../services/encryption-descryption.service';
import { Router } from '@angular/router';
import { Common } from '../../../helpers/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public encryptEmployee: FormGroup;
  public employeeProfile: FormGroup= new FormGroup({});
  public profile: any = [];
  controlForm : any;
  empImage: any;
  img = false;
controls: any[]=[];

  constructor(private toastr: ToastrService,
              private router: Router,
              private employee: EmployeeListService,
              private encryptObj: EncryptionDescryptionService,
              private fb: FormBuilder,
              ) {
                const id = localStorage.getItem('empId');
                const encryptEmployeeId = this.encryptObj.encryptData(id);
                this.encryptEmployee = this.fb.group({
                  employeeId : encryptEmployeeId
                });

                this.employee.getEmployeeById(this.encryptEmployee.value)
                .subscribe(
                  successResponseEmployee => {
                    this.profile = successResponseEmployee.empList;
                    console.log(successResponseEmployee.empList);

                    this.employeeProfile.patchValue({
                      empId : successResponseEmployee.empList.empId,
                      empName: successResponseEmployee.empList.empName,
                      imagePath: successResponseEmployee.empList.imagePath,
                      address:  successResponseEmployee.empList.presentAddress,
                      contactNumber:  successResponseEmployee.empList.contactNumber,
                      empCode: successResponseEmployee.empList.empCode,
                      nidCard: successResponseEmployee.empList.nidCard,
                      empEmail: successResponseEmployee.empList.empEmail,
                      birthDate: successResponseEmployee.empList.birthDate,
                      SysUserId: successResponseEmployee.empList.sysUserId
                    });
                    this.empImage = Common.baseUrl + '/' + successResponseEmployee.empList.imagePath;
                    if (successResponseEmployee.empList.imagePath != null){
                           this.img = true;
                    }
                  },
                  responseError => {
                    this.toastr.error(responseError.message);
                  }
                );
              }

  ngOnInit() {
    this.employeeProfile = this.fb.group({
      empId: ['', [Validators.required]],
      empName: ['', [Validators.required]],
      address: [],
      birthDate: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      empEmail: ['', [Validators.required]],
      nidCard: [],
      empCode: [''],
      SysUserId: [''],
      images: this.fb.array([]),
      imagePath: ['']
    });
  }

  public picked(event:any) {
    // this.currentId = field;
    const files = event.target.files;
    // tslint:disable-next-line:no-string-literal
    this.controlForm = (this.employeeProfile.get('images') as FormArray).controls;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        // tslint:disable-next-line:prefer-const
        let dataUrl = reader.result + '';
        // tslint:disable-next-line:prefer-const
        let base64 = dataUrl.substr(dataUrl.indexOf(',') + 1);
        this.controlForm.push(this.fb.control(dataUrl));
        console.log(this.controlForm);
      };
      reader.readAsDataURL(files[i]);
    }
    event.srcElement.value = null;
  }

  save(employeeFormArr: any) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.controlForm.length; i++) {
       employeeFormArr.images.push( this.controlForm[i].value);

    }
  }

  onSubmit(){
    console.log(this.employeeProfile.value);

    this.encryptEmployee = this.fb.group({
      ImageSource: [this.employeeProfile.get('images')?.value],
      ImagePath: this.employeeProfile.get('empCode')?.value,
      PresentAddress : this.encryptObj.encryptData(this.employeeProfile.get('address')?.value),
      ContactNumber : this.encryptObj.encryptData(this.employeeProfile.get('contactNumber')?.value),
      NidCard : this.encryptObj.encryptData(this.employeeProfile.get('nidCard')?.value),
      empName: this.encryptObj.encryptData(this.employeeProfile.get('empName')?.value),
      empId: this.encryptObj.encryptData(this.employeeProfile.get('empId')?.value),
      empEmail: this.encryptObj.encryptData(this.employeeProfile.get('empEmail')?.value),
      BirthDate: this.encryptObj.encryptData(this.employeeProfile.get('birthDate')?.value),
      empCode: this.encryptObj.encryptData(this.employeeProfile.get('empCode')?.value),
      SysUserId: this.encryptObj.encryptData(this.employeeProfile.get('SysUserId')?.value),
   });

    this.employee.editEmployee(this.encryptEmployee.value)
    .subscribe({
      next:data => {
        this.router.navigate(['/profile']);
        this.toastr.success('Success!');
        },
        error:error => {
          this.toastr.error(error.error);
        }
      });
  }

}
