import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/http/services/request.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  programForm: any = FormGroup;
  user: any = {};
  isEditMode: boolean = false;

  id: any = '';
  pageUrl: any = '';
  link: string = "/users"

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private RequestService: RequestService,
    private snackbar: SnackbarService
  ) {
    this.user = this.router.getCurrentNavigation()?.extras?.state?.user;
  }

  ngOnInit(): void {
    this.pageUrl = window.location.href;

    this.formInit();
    
    if (this.user?.id) {
      this.programForm.patchValue(this.user);
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }

    this.getPageDetails();
  }

  formInit() {
    this.programForm = this.fb.group({
      id: [this.randomId()],
      firstName: ['', [Validators.required, Validators.maxLength(60)]],
      lastName: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      personalId: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      profilePhoto: ['https://i.ibb.co/pKdGF9M/user-icon.png', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      gender: ['male', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    })
  }

  randomId(){
    return Math.floor((2 + Math.random()) * 0x999);
  }

  async getPageDetails() {
    this.id = await this.pageUrl.split('/').at(-2);

    if (this.id) {
      this.RequestService.getById(this.id, this.link).subscribe((res: any) => {
        this.user = res[0];
        this.programForm.patchValue(this.user);
      });
    }
    if (this.id == 0) {
      this.programForm.reset();
    }
  }

  

  edit(programForm: any) {
    let data = programForm.value;
    this.RequestService.update(data, this.user?.id, this.link).subscribe((res: any) => {
      this.snackbar.openSnackBar(`${res.firstName} - User has been Updated`, 'Close');
      this.router.navigateByUrl('/users/user-listing/0');
    }, (error) => {
      this.snackbar.openSnackBar('User Updation Failed', 'Close');
      this.router.navigateByUrl('/users/user-listing/0');
    })
  }

  save(programForm: any) {
    let data = programForm.value;
    this.RequestService.save(data, this.link).subscribe((res: any) => {
      this.snackbar.openSnackBar(`${res.firstName} - New User has been Created`, 'close');
      this.router.navigateByUrl('/users/user-listing/0');
    }, (error) => {
      this.snackbar.openSnackBar('User Creation Failed', 'Close');
      this.router.navigateByUrl('/users/user-listing/0');
    })
  }

  delete() {
    this.RequestService.delete(this.user?.id, this.link).subscribe((res: any) => {
      this.snackbar.openSnackBar('User has been Deleted', 'Close');
      this.router.navigateByUrl('/users/user-listing/0');
    }, (error) => {
      this.snackbar.openSnackBar('User Deletion Failed', 'Close');
      this.router.navigateByUrl('/users/user-listing/0');
    })
  }

}
