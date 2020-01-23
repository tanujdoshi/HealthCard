import { Component, OnInit } from "@angular/core";

import { RegisterService } from "../register.service";
import { RouterModule, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(
    private register: RegisterService,
    private Toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.Toastr.error("Passwords must match")
  }
  registerPatient(form) {
    var name = form.name.value;
    //var contact=form.contact.value;
    var password = form.password.value;
    var cpassword = form.cpassword.value;
    var address = form.address.value;
    var select = form.select.value;
    if (select == "1") {
      // console.log('Select')
      this.Toastr.warning("Select How Do You Want TO Sign Up");
    }
    else if (password != cpassword) {
      this.Toastr.warning("password not matched");
    } else {
      localStorage.setItem("user", select);
      localStorage.setItem("password",password);
      this.router.navigate(["/Signup2"], {
        queryParams: { name: name,  address: address }
      });
    }
  }
}
