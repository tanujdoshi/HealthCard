import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { LoginStat } from './Classes/Login/login-stat';
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class RegisterService {

  
  public loginStat = new BehaviorSubject<LoginStat>(new LoginStat())
  public loginStatCaster = this.loginStat.asObservable()

  public userData = new BehaviorSubject<any>(null)

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

  registeDoc(
    fname,
    lname,
    password,
    address,
    contact,
    dob,
    blood,
    email,
    user,
    licence,
    degree,
    specialities,
    newSpecialities,
    work_place,
    work_place_con,
    work_place_add
  ) {
    console.log("Inside Doc registration");
    this.http
      .get(
        "http://localhost:8000/getUserId/" +
          fname +
          "/" +
          lname +
          "/" +
          user +
          "/" +
          dob
      )
      .subscribe((response: any) => {
        var userId = response.userId;
        this.http
          .post("http://localhost:8000/registeruser", {
            fname,
            lname,
            password,
            address,
            contact,
            dob,
            blood,
            email,
            user,
            userId
          })
          .subscribe((response: any) => {
            if (response.success) {
              console.log("Inserted Successfully Doc as user");
              this.http
                .post("http://localhost:8000/doctorExtraDetail", {
                  licence,
                  degree,
                  specialities,
                  work_place,
                  work_place_con,
                  work_place_add
                })
                .subscribe((res: any) => {
                  if (res.success) {
                    this.Toastr.success("Registration of Doctor successfull!!");
                  } else {
                    this.Toastr.error("Doc Registration Failed", "Failed");
                  }
                });
            } else {
              console.log("Registration Error in doc user");
              this.Toastr.error("Registration Failed", "Failed");
            }
          });
      });
  }

  registerUser(
    fname,
    lname,
    password,
    address,
    contact,
    dob,
    blood,
    email,
    user
  ) {
    this.http
      .get(
        "http://localhost:8000/getUserId/" +
          fname +
          "/" +
          lname +
          "/" +
          user +
          "/" +
          dob
      )
      .subscribe((response: any) => {
        var userId = response.userId;
        this.http
          .post("http://localhost:8000/registeruser", {
            fname,
            lname,
            password,
            address,
            contact,
            dob,
            blood,
            email,
            user,
            userId
          })
          .subscribe((response: any) => {
            if (response.success) {
              console.log("Inserted Successfully");
              this.Toastr.success("Registration of user successfull!!");
            } else {
              console.log("Registration Error");
              this.Toastr.error("Registration Failed", "Failed");
            }
          });
      });
  }

  login(uname, password) {
    this.http
      .post("http://localhost:8000/login", { uname, password })
      .subscribe((response: any) => {
        console.log("login:", response);
        if (response.success) {
          var s = new LoginStat()
          s.isLogged = true
          s.userType = response.userType
          this.loginStat.next(s)

          this.userData.next(response.userData)
          this.Toastr.success("Login Successful")
          this.router.navigate(["/Patient/Home"])
        } else {
          this.Toastr.error("Login Failed")
        }
      });
  }

  logout()
  {
    var s = new LoginStat()
    s.isLogged = false
    s.userType = null
    this.loginStat.next(s)
    this.Toastr.success("Logged Out")
    this.router.navigate(["/Login"])
  }
}
