import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { PaymentReceiptsComponent } from './payment-receipts/payment-receipts.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { HttpClientModule } from '@angular/common/http';
import { AdmittedComponent } from './admitted/admitted.component';
import { FunctionaryComponent } from './functionary/functionary.component';
import { PersonalDocComponent } from './documentation/personal-doc/personal-doc.component';
import { ParentsDocComponent } from './documentation/parents-doc/parents-doc.component';
import { DiscountDocComponent } from './documentation/discount-doc/discount-doc.component';
import { SpecialDocComponent } from './documentation/special-doc/special-doc.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    LogInComponent,
    PaymentReceiptsComponent,
    AdmittedComponent,
    FunctionaryComponent,
    PersonalDocComponent,
    ParentsDocComponent,
    DiscountDocComponent,
    SpecialDocComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    MatCarouselModule.forRoot(),
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
