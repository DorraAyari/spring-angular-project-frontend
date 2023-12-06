import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { Student } from 'src/app/models/auth-models/student';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnChanges{
  @Input()student : Student = {};
  @Output()notif=new EventEmitter();
  @Output()updateStudent=new EventEmitter();

  OnInit(){
    console.log("student: ",this.student);
  }

  constructor(private service: AuthService){}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log("student: ",this.student);
  }

  update(updateS:any){
    this.service.updateUser(updateS,this.student?.idEtudiant).subscribe(
      (res)=>{
        alert('Student updated')
        this.updateStudent.emit(updateS)
      }
    )
    //console.log("updateStudent : ",updateS)
    }
}
