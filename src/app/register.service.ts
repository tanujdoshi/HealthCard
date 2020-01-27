import { Injectable, TestabilityRegistry } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private Toastr: ToastrService
  ) {}

  register(licence, name, shop_name, contact, password, address, user) {
    //console.log("in registershop");
    this.http
      .post("http://localhost:8000/register", {
        licence,
        name,
        shop_name,
        contact,
        password,
        address,
        user
      })
      .subscribe((response: any) => {
        if (response.success) {
          console.log("Inserted Successfully");
          this.Toastr.success("Registration of medical shop successfull!!");
        }
      });
  }

  registeDoc(
    licence,
    name,
    password,
    work_place,
    specialist,
    degree,
    work_place_add,
    doc_address,
    work_place_con,
    doc_contact,
    user
  ) {
    console.log("Inside Doc registration");
    this.http
      .post("http://localhost:8000/register", {
        licence,
        name,
        password,
        work_place,
        specialist,
        degree,
        work_place_add,
        doc_address,
        work_place_con,
        doc_contact,
        user
      })
      .subscribe((response: any) => {
        if (response.success) {
          console.log("Inserted Successfully");
          this.Toastr.success("Registration of Doctor successfull!!");
        }
      });
  }

  private specList = new Subject();

  getSpecList() {
    return this.specList.asObservable();
  }

  getSpecialityArray() {
    console.log("inside getSpecialityArray");
    this.http
      .post("http://localhost:8000/getSpecialities", {})
      .subscribe((response: any) => {
        console.log(JSON.stringify(response));
        this.specList.next(response.specialityArray);
      });
  }

  getId(fname, lname, user, dob) {
    //XXXX-XXXX-XXXX   user id create here
  }

  registeruser(name, password, address, contact, dob, blood, email, user) {
    //console.log("in registershop");
    this.http
      .post("http://localhost:8000/registeruser", {
        name,
        password,
        address,
        contact,
        dob,
        blood,
        email,
        user
      })
      .subscribe((response: any) => {
        if (response.success) {
          console.log("Inserted Successfully");
          this.Toastr.success("Registration of user successfull!!");
        }
      });
  }
  login(uname, password) {
    this.http
      .post("http://localhost:8000/login", { uname, password })
      .subscribe((response: any) => {
        console.log("login:", response);
        if (response.success) {
          sessionStorage.setItem("isLogged", "true");
          sessionStorage.setItem("userType", response.userType);
          this.Toastr.success("Login Successful");
        } else {
          this.Toastr.error("Login Failed");
        }
      });
  }
}
