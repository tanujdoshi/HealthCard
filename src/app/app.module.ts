import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { Signup2Component } from "./signup2/signup2.component";
import { ToastrModule } from "ngx-toastr";
import { PatientHomeComponent } from './Patient/patient-home/patient-home.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    FooterComponent,
    Signup2Component,
    PatientHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    QRCodeModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-top-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
