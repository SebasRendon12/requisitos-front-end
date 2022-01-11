import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { PaymentReceiptsComponent } from './payment-receipts/payment-receipts.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [

  { path: '', component: LogInComponent },
  { path: 'student', component: StudentComponent },
  { path: 'login', component: LogInComponent },
  { path: 'paymentReceipts', component: PaymentReceiptsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
