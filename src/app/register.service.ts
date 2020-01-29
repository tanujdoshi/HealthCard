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


  register(password,fname,lname,email,blood,dob,contact,address,user,licence,labname,DOE,lab_address,selectedItems) {
    //console.log("in registershop");
    this.http.get('http://localhost:8000/getUserId/'+fname+'/'+lname+'/'+user+'/'+dob)
    .subscribe((response:any)=>{
      var userId = response.userId
      if(user == "lab")
      {
      this.http
        .post("http://localhost:8000/register", {
          userId,password,fname,lname,email,blood,dob,contact,address,user,licence,labname,DOE,lab_address,selectedItems
        })
        .subscribe((response: any) => {
          if (response.success) {
            console.log("Inserted Successfully");
            this.Toastr.success("Registration of  Lab successfull!!");
          }
        });
    }
  })
};
    registermedic(password,fname,lname,email,blood,dob,contact,address,user,licence,shopname,DOE,shop_address,)
    {
      this.http.get('http://localhost:8000/getUserId/'+fname+'/'+lname+'/'+user+'/'+dob)
      .subscribe((response:any)=>{
        var userId = response.userId
      this.http
      .post("http://localhost:8000/registermedic", {
        userId,password,fname,lname,email,blood,dob,contact,address,user,licence,shopname,DOE,shop_address
      })
      .subscribe((response: any) => {
        if (response.success) {
          console.log("Inserted Successfully");
          this.Toastr.success("Registration of medical shop successfull!!");
        }
      });
    })
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
          sessionStorage.setItem("isLogged", "true");
          sessionStorage.setItem("userType", response.userType);
          this.Toastr.success("Login Successful");
        } else {
          this.Toastr.error("Login Failed");
        }
      });
  }
}
