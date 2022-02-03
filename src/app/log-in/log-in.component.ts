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
      nombre_usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
    if (this.global.currentSession.usuario !== null && this.global.currentSession.usuario !== undefined) {
      this.redirect();
    } else {
      this.header.setItems([], 'login');
    }
  }

  resetSession() {
    this.global.currentSession = new cSession();
    this.global.currentUser = new cUser();
    localStorage.clear();
  }

  private redirect() {
    switch (this.global.currentSession.usuario?.perfil.toLowerCase()) {
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
        this.global.toastr.info('Este rol no tiene acceso', 'Rol no permitido', { timeOut: 4000 });
        break;
    }
  }

  async submit(): Promise<void> {
    const user = this.logInForm.value as cUser;
    if (this.logInForm.valid) {
      var res = await this.global.makeRequest({
        url: this.global.urls.urlLogIn,
        spinner: true,
        item: user
      });
      if (res) {
        if (this.global.validNUE(res.message)) {
          await this.global.saveNewCurrentSession(res.message);
          this.redirect();
        }
      }
    }
    else
      this.global.toastr.error('El usuario y la contraseña son obligatorias', 'Datos inválidos', { timeOut: 3000 });
  }

}
