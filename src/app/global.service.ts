import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cUser } from './classes/cUser';
import { ToastrService } from 'ngx-toastr';
import { cSession } from './classes/cSession';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST: GET: OPTIONS: PUT' });
  public BASE_URL = "";
  public currentComponent = "login";
  public currentLocation = "Ciclo de la Matrícula";
  public currentUser: cUser = new cUser();
  public currentSession: cSession = new cSession();

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public http: HttpClient
  ) {
    const localStorageData = localStorage.getItem('g1reqmatr');
    if (localStorageData !== null) {
      this.currentSession = JSON.parse(localStorageData);
    }
    if (this.currentSession.user === undefined) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
    this.dateValidation();
    this.currentUser = this.currentSession.user!;
  }

  public saveCurrentSession() {
    var newSession: cSession = new cSession();
    newSession.user = this.currentUser;
    localStorage.setItem('g1reqmatr', JSON.stringify(newSession));
  }

  public logOut() {
    localStorage.clear();
    this.currentSession.user = undefined;
    this.router.navigateByUrl('/login');

  }

  dateValidation() {
    var date1: Date = new Date(this.currentSession.expirationDate);
    var currentDate: Date = new Date();
    if (date1.getTime() < currentDate.getTime()) {
      this.logOut();
    }
  }

}
