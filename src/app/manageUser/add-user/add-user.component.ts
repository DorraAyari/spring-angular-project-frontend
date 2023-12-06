import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Student } from './../../models/auth-models/student';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  addStudentForm!: FormGroup;
  type: string = "password";
  istext: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  @Output()addedStudent=new EventEmitter<Student>;

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toast: NgToastService){}

  ngOnInit(): void {
    this.addStudentForm = this.fb.group({
      nomEt: ['',Validators.required],
      prenomEt: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      cin: ['',Validators.required],
      ecole: ['',Validators.required] ,
      password :['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)] ]
    })
  }

  addStudent() {
    if(this.addStudentForm.valid){
      //console.log(this.addStudentForm.value);
      let student: Student = {};
      student.nomEt = this.addStudentForm.get('nomEt')?.value;
      student.prenomEt = this.addStudentForm.get('prenomEt')?.value;
      student.cin = this.addStudentForm.get('cin')?.value;
      student.ecole = this.addStudentForm.get('ecole')?.value;
      student.email = this.addStudentForm.get('email')?.value;
      student.password = this.addStudentForm.get('password')?.value;
      student.dateNaissance = '2000-05-13';
      student.role='USER';
      //console.log("student",student);
      this.service.AddStudent(student).subscribe(
        (res)=>{
          alert('added')
          console.log("res: ",res);
          this.addedStudent.emit(res)
         }
      )


    }else{
      // Throw the error using toester and with required file
      console.log("form invalid")
      ValidateForm.validateAllFormFields(this.addStudentForm);
      this.toast.error({detail:"ERROR", summary:"Your form is invalid !", duration:2000});
      /*this.snakBar.open("Your form is invalid !",'Error',{
        duration: 2000
      });*/
    }
  }

  hideShowPass(){
    this.istext = !this.istext;
    this.istext ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.istext ? this.type = "text" : this.type = "password";
  }


}
