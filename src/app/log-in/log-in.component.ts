import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { cSession } from '../classes/cSession';
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
  ) { }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.global.currentSession.user !== null && this.global.currentSession.user !== undefined) {
      switch (this.global.currentSession.user?.rol.toLowerCase()) {
        case 'estudiante':
          this.router.navigate(['student']);
          break;
        case 'admitido':
          this.router.navigate(['admitted']);
          break;
        case 'funcionario':
          this.router.navigate(['functionary']);
          break;

        default:
          break;
      }
    } else {
      this.header.setItems([], 'login');
    }
  }

  resetSession() {
    this.global.currentSession = new cSession();
    this.global.currentUser = new cUser();
    localStorage.clear();
  }

  submit(): void {
    const user = this.logInForm.value as cUser;
    switch (user.userName) {
      case 'serendona':
        user.nit = '1001366265';
        user.name = "Sebastián Rendón Arteaga";
        user.rol = "Estudiante";
        user.phone = "3147427098";
        user.address = "Cra 43 B 73 a noreste";
        user.email = "serendona@unal.edu.co";
        this.global.currentUser = user;
        this.global.saveCurrentSession(this.global.currentSession);
        this.router.navigate(['student']);
        break;
      case 'elondonoc':
        user.nit = '4337164975';
        user.name = "Edwar Jose Londoño Correa";
        user.rol = "Admitido";
        user.phone = "3117649734";
        user.address = "Cra 43 B 73 a noreste";
        user.email = "elondonoc@unal.edu.co";
        this.global.currentUser = user;
        this.global.saveCurrentSession(this.global.currentSession);
        this.router.navigate(['admitted']);
        break;
      case 'cmzapata':
        user.nit = '1421649754';
        user.name = "Carlos Mario Zapata Jaramillo";
        user.rol = "Funcionario";
        user.phone = "3123467494";
        user.address = "Cra 43 B 73 a noreste";
        user.email = "cmzapata@unal.edu.co";
        this.global.currentUser = user;
        this.global.saveCurrentSession(this.global.currentSession);
        this.router.navigate(['functionary']);
        break;

      default:
        this.global.toastr.error('Documento o contraseña incorrectas', 'Error');
        break;
    }
  }

}
