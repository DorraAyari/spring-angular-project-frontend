import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/auth-models/student';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent {


  students!: Student[];
  showFormAdd=false;
  show=false;
  showDeleteModal = false;
  studentToSelected!:Student;

  constructor(
    private service: AuthService,
    private router:Router){
  }

  ngOnInit(): void {
    this.service.getStudents().subscribe(
      (res) => {
        this.students = res;
        console.log("List students : ",res);
      },
      (errorResponce) => {
        console.log(errorResponce);
      }
    )
  }

  addUser(){
    this.showFormAdd=true
  }

  addElementToTab(e:any){
    //console.log("e : ",e);
    this.students.push(e);
    this.showFormAdd=false;
  }

  update(us:Student){
    this.show=true;
  this.studentToSelected=us;
  //console.log('studentToSelected: ',this.studentToSelected);
  }

  traitement(t:any){
    this.show=!this.show
  }

  changeTab(e:Student){
    this.show=false;
    for(let i=0;i<this.students.length;i++){
      if(this.students[i].idEtudiant==e.idEtudiant){
        this.students[i]=e;
      }
    }
  }


  deleteEtudiant(etudiant : Student): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette etudiant ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteStudent(etudiant.idEtudiant!).subscribe(
          () => {
            console.log('Student deleted successfully');
            // Recharger les données DataTables
            const index = this.students.findIndex(student => student.idEtudiant === etudiant.idEtudiant);

            if (index !== -1) {
              alert('Student deleted');
              this.students.splice(index, 1);
            }
          },
          (error) => {
            console.error('Error deleting student', error);
            // Handle error as needed
          }
        );
      }
    });
  }
  // Close the confirmation modal
  cancelDelete(): void {
    this.showDeleteModal = false;
  }

}
