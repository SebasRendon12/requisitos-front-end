import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GlobalService } from '../global.service';
import { cSession } from '../models/classes/cSession';
import { cUser } from '../models/classes/cUser';

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
      switch (this.global.currentSession.user?.perfil.toLowerCase()) {
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
    // switch (user.userName) {
    //   case 'serendona':
    //     user.identificacion = '1001366265';
    //     user.nombre_completo = "Sebastián Rendón Arteaga";
    //     user.perfil = "Estudiante";
    //     user.email = "serendona@unal.edu.co";
    //     this.global.currentUser = user;
    //     this.global.saveCurrentSession(this.global.currentSession);
    //     this.router.navigate(['student']);
    //     break;
    //   case 'elondonoc':
    //     user.identificacion = '4337164975';
    //     user.nombre_completo = "Edwar Jose Londoño Correa";
    //     user.perfil = "Admitido";
    //     user.address = "Cra 43 B 73 a noreste";
    //     user.email = "elondonoc@unal.edu.co";
    //     this.global.currentUser = user;
    //     this.global.saveCurrentSession(this.global.currentSession);
    //     this.router.navigate(['admitted']);
    //     break;
    //   case 'cmzapata':
    //     user.identificacion = '1421649754';
    //     user.nombre_completo = "Carlos Mario Zapata Jaramillo";
    //     user.perfil = "Funcionario";
    //     user.address = "Cra 43 B 73 a noreste";
    //     user.email = "cmzapata@unal.edu.co";
    //     this.global.currentUser = user;
    //     this.global.saveCurrentSession(this.global.currentSession);
    //     this.router.navigate(['functionary']);
    //     break;

    //   default:
    //     break;
    // }
    //     this.global.toastr.error('Documento o contraseña incorrectas', 'Error');
  }

}
