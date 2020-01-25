import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RegisterService } from "../register.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.css"]
})
export class Signup2Component implements OnInit {
  public fname;
  public lname;
  public password;
  public blood;
  public user;
  public dob;
  public userId;
  public address;
  public email;
  public contact;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private Toastr: ToastrService,
    private register: RegisterService
  ) {}

  ngOnInit() {
    var basicForm = history.state;
    console.log(JSON.stringify(basicForm));
    this.fname = basicForm.fname;
    this.lname = basicForm.lname;
    this.password = basicForm.password;
    this.blood = basicForm.blood;
    this.user = basicForm.user;
    this.dob = basicForm.dob;
    this.address = basicForm.address;
    this.email = basicForm.email;
    this.contact=basicForm.contact;
    this.userId = this.fname + "_" + this.lname;

    // Uncomment after ready getId ready in register.service.ts
    // this.userId = this.register.getId(
    //   this.fname,
    //   this.lname,
    //   this.user,
    //   this.dob
    // );
  }

  registerLab(form) {
    var licence =form.licence.value;
    var labname = form.lab_name.value;
    var DOE=form.DOE.value;
   // var contact = form.contact.value;
    //console.log(licence, shopname);
    this.register.register(
      this.userId,
      this.password,
      this.fname,
      this.lname,
      this.email,
      this.blood,
      this.dob,
      this.contact,
      this.address,
      this.user,
      licence,
      labname,
      DOE
   );
  }
  //   //  console.log(licence , shopname)
     
   }

  // registerDoc(form) {
  //   this.register.registeDoc(
  //     form.licence.value,
  //     this.name,
  //     this.password,
  //     form.work_name.value,
  //     form.specialist.value,
  //     form.degree.value,
  //     form.work_address.value,
  //     this.address,
  //     form.work_contact.value,
  //     form.contact.value,
  //     this.user
  //   );
  // }
  // registerPatient(form) {
  //   //console.log("In com");
  //   var contact = form.contact.value;
  //   var dob = form.DOB.value;
  //   var blood = form.bloodType.value;
  //   var email = form.email.value;
  //   this.register.registeruser(
  //     this.fname,
  //     this.lname,
  //     this.userId,
  //     this.password,
  //     this.address,
  //     contact,
  //     dob,
  //     blood,
  //     email,
  //     this.user
  //   );
  // }

