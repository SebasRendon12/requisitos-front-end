import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmittedComponent } from './admitted/admitted.component';
import { DiscountDocComponent } from './documentation/discount-doc/discount-doc.component';
import { ParentsDocComponent } from './documentation/parents-doc/parents-doc.component';
import { PersonalDocComponent } from './documentation/personal-doc/personal-doc.component';
import { SpecialDocComponent } from './documentation/special-doc/special-doc.component';
import { FunctionaryComponent } from './functionary/functionary.component';
import { LogInComponent } from './log-in/log-in.component';
import { PaymentReceiptsComponent } from './payment-receipts/payment-receipts.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [

  { path: '', component: LogInComponent },
  { path: 'student', component: StudentComponent },
  { path: 'admitted', component: AdmittedComponent },
  { path: 'functionary', component: FunctionaryComponent },
  { path: 'login', component: LogInComponent },
  { path: 'paymentReceipts', component: PaymentReceiptsComponent },
  { path: 'personalDoc', component: PersonalDocComponent },
  { path: 'parentsDoc', component: ParentsDocComponent },
  { path: 'discountDoc', component: DiscountDocComponent },
  { path: 'specialDoc', component: SpecialDocComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
