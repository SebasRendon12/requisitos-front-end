import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { cUser } from '../classes/cUser';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public logInForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private global: GlobalService,
    private header: AppComponent,
  ) {
  }

  ngOnInit(): void {
    if (this.global.currentSession.user !== null && this.global.currentSession.user !== undefined) {
      switch (this.global.currentSession.user?.rol.toLowerCase()) {
        case 'estudiante':
          this.router.navigate(['student']);
          break;

        default:
          break;
      }
    } else {
      this.header.setItems([], 'login');
      this.logInForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  submit(): void {
    const user = this.logInForm.value as cUser;
    // if (user.userName === 'serendona') {
    user.nit = '1001366265';
    user.name = "Sebastián Rendón Arteaga";
    user.rol = "Estudiante";
    user.phone = "3147427098";
    user.address = "Cra 43 B 73 a noreste";
    user.email = "serendona@unal.edu.co";
    this.global.currentUser = user;
    this.global.saveCurrentSession();
    this.router.navigate(['student']);
    // } else {
    //   this.global.toastr.error('Documento o contraseña incorrectas', 'Error');
    // }
  }

}
