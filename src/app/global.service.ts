import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { iConnectionParameters } from './models/interfaces/iConnectionParameters';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { cSession } from './models/classes/cSession';
import { cUser } from './models/classes/cUser';
import { GlobalUrlsService } from './global-urls.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE' });
  public BASE_URL = "http://localhost:8000/g1/";
  public currentComponent = "login";
  public currentLocation = "Ciclo de la Matrícula";
  public currentUser: cUser = new cUser();
  public currentSession: cSession = new cSession();

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public http: HttpClient,
    public urls: GlobalUrlsService,
    public spinner: NgxSpinnerService,
  ) {
    this.loadCurrentSession();
  }

  // public saveCurrentSession(newSession?: cSession) {
  //   newSession = newSession ? newSession : new cSession();
  //   const newDates = new cSession();
  //   newSession.fecha = newDates.fecha;
  //   newSession.expirationDate = newDates.expirationDate;
  //   newSession.user = this.currentUser;
  //   localStorage.setItem('g1reqmatrsess', JSON.stringify(newSession));
  //   this.currentUser = newSession.user;
  // }

  public async logOut() {
    localStorage.removeItem('g1reqmatrsess');
    var req = await this.makeRequest({
      url: this.urls.urlSession,
      code: this.currentSession.id
    });
    if (req.success) {
      this.toastr.success(undefined, req.message, { timeOut: 3000 });
    }
    this.currentSession = new cSession();
    this.currentUser = new cUser();
    this.router.navigateByUrl('/login');

  }

  public async loadCurrentSession() {
    const localStorageData = localStorage.getItem('g1reqmatrsess');
    if (localStorageData !== null) {
      this.currentSession = JSON.parse(localStorageData);
    }
    if (this.currentSession.usuario_id !== undefined) {
      if (this.currentSession.usuario_id !== undefined) {
        var req = await this.makeRequest({
          url: this.urls.urlSession + this.currentSession.usuario_id,
        });
        if (req.success) {
          this.currentSession = req.message;
          this.currentUser = this.currentSession.user!;
        }
      }
    }
    if (this.currentSession.user === undefined) {
      localStorage.removeItem('g1reqmatrsess');
      this.router.navigate(['login']);
    }
    await this.dateValidation();
    this.currentUser = this.currentSession.user!;
  }

  async dateValidation() {
    var date1: Date = new Date(this.currentSession.expirationDate);
    var currentDate: Date = new Date();
    if (date1.getTime() < currentDate.getTime()) {
      this.toastr.info('Su sesión ya ha caducado, porfavor ingrese nuevamente', 'Sesión caducada');
      await this.logOut();
    }
  }

  public async makeRequest(params: iConnectionParameters) {
    var res = await this.request(params) as any;
    if (res === undefined) { return undefined; }
    if (!this.validNUE(res)) { this.toastr.error(res?.message, 'Error de ejecución', { timeOut: 3000 }); return false; }
    if (!res?.success) { this.toastr.error(res?.message, 'Error', { timeOut: 3000 }); return false; }
    if (!this.validNUE(res?.message)) { return false; }
    return res.message;
  }

  private request(p: iConnectionParameters) {
    if (p.spinner != false) { this.spinner.show(); }

    const tipo = p.item === undefined ? p.code == undefined ? "get" : "delete" : p.code == undefined ? "post" : "put";
    var conexion: Observable<Object>;
    switch (tipo) {
      case 'get':
        conexion = this.http.get(this.BASE_URL, { headers: this.headers })
        break;
      case 'post':
        conexion = this.http.post(this.BASE_URL, p.item, { headers: this.headers })
        break;
      case 'put':
        conexion = this.http.put(this.BASE_URL, p.item, { headers: this.headers });
        break;
      case 'delete':
        conexion = this.http.delete(this.BASE_URL, { headers: this.headers })
        break;
      default:
        break;
    }

    return new Promise((resolve, reject) => {
      conexion.subscribe((res: any) => {
        if (p.spinner)
          this.spinner.hide();
        resolve(res);
      }, err => {
        this.spinner.hide();
        this.toastr.error("", 'Error de ejecución', { timeOut: 3000 });
        console.log("Error => " + err.message);
        resolve(undefined);
        reject(err);
      })
    });
  }

  validNUE(res: any): boolean {
    return res === undefined ? false : res === null ? false : res === '' ? false : true;
  }

  public validateAccess(rol: string) {
    this.loadCurrentSession();
    if (this.currentSession.user === null || this.currentSession.user === undefined) {
      this.router.navigate(['login']);
    }
    if (this.currentUser.perfil.toLowerCase() !== rol.toLowerCase()) {
      var page = "";
      switch (this.currentUser.perfil.toLowerCase()) {
        case 'estudiante':
          page = 'student';
          break;

        case 'admitido':
          page = 'admitted';
          break;

        case 'funcionario':
          page = 'functionary';
          break;

        default:
          page = 'login';
          break;
      }
      setTimeout(() => {
        this.router.navigate([page]);
      }, 1);
      this.toastr.error('No tiene acceso a esta página, ha sido redirigido', 'Error', {
        timeOut: 3000
      });
    }
  }

}
