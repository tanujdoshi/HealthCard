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
  public name;
  // public contact
  public password;
  public address;
  public user;
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private Toastr: ToastrService,
    private register: RegisterService
  ) {}

  ngOnInit() {
    this.name = this._route.snapshot.queryParams.name;
    // this.contact=this._route.snapshot.queryParams.contact;
    this.password = this._route.snapshot.queryParams.password;
    this.address = this._route.snapshot.queryParams.address;
    this.user = localStorage.getItem("user");
    //console.log(this.user , this.name , this.address);
  }

  registerMedic(form) {
    var licence = form.licence.value;
    var shopname = form.shop_name.value;
    var contact = form.contact.value;
    console.log(licence, shopname);
    this.register.register(
      licence,
      this.name,
      shopname,
      contact,
      this.password,
      this.address,
      this.user
    );
  }
  registerLab(form) {
    var licence = form.licence.value;
    var shopname = form.lab_name.value;
    var contact = form.contact.value;
    //  console.log(licence , shopname)
    this.register.register(
      licence,
      this.name,
      shopname,
      contact,
      this.password,
      this.address,
      this.user
    );
  }

  registerDoc(form) {
    this.register.registeDoc(
      form.licence.value,
      this.name,
      this.password,
      form.work_name.value,
      form.specialist.value,
      form.degree.value,
      form.work_address.value,
      this.address,
      form.work_contact.value,
      form.contact.value,
      this.user
    );
  }
  registerPatient(form)
  {
    var contact = form.contact.value;
    var dob=form.DOB.value;
    var blood=form.bloodType.value;
    var email=form.email.value;
    this.register.registeruser(this.name,this.password,this.address,contact,dob,blood,email,this.user);
  }
}
