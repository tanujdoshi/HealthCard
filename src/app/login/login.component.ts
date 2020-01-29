import { Component, OnInit } from "@angular/core";
import { RegisterService } from '../register.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  constructor(private registeService: RegisterService) {}

  ngOnInit() {}
  login(uname, password) {
    console.log(uname.value, password.value);
    this.registeService.login(uname.value, password.value);
  }
}
