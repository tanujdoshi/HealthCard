import { Component, OnInit } from "@angular/core";

import { RegisterService } from "../register.service";
import { RouterModule, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { from } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  basicForm: JSON;
  constructor(private Toastr: ToastrService, private router: Router) {}

  ngOnInit() {}
  register(form) {
    var password = form.password.value;
    var cpassword = form.cpassword.value;
    var select = form.select.value;
    if (select == "1") {
      this.Toastr.warning("Select How Do You Want TO Sign Up");
    } else if (password != cpassword) {
      this.Toastr.warning("password not matched");
    } else {
      this.router.navigate(["/Signup2"], {
        state: {
          fname: form.fname.value,
          lname: form.lname.value,
          password: password,
          email: form.email.value,
          user: select,
          blood: form.bloodType.value,
          dob: form.DOB.value,
          contact: form.contact.value,
          address: form.address.value
        }
      });
    }
  }
}
