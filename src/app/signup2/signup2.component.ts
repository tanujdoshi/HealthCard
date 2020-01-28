import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RegisterService } from "../register.service";
import { ToastrService } from "ngx-toastr";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Subscription } from "rxjs";

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
  public selectedItems: any[];
  public dropdownList = [];
  public specialities: any[] = [
    {
      speciality: ""
    }
  ];

  private sub1: Subscription;
  public dropdownSettings: IDropdownSettings;

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
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.userId = this.fname + "_" + this.lname;
    this.register.getSpecialityArray();
    this.sub1 = this.register.getSpecList().subscribe((list: []) => {
      this.dropdownList = list;
    });

    // this.dropdownList = this.register.getSpecialityArray();
    // Uncomment after ready getId ready in register.service.ts
    // this.userId = this.register.getId(
    //   this.fname,
    //   this.lname,
    //   this.user,
    //   this.dob
    // );
  }

  addSpeciality() {
    this.specialities.push({
      speciality: ""
    });
  }

  removeSpeciality(i: number) {
    this.specialities.splice(i, 1);
  }

  // registerMedic(form) {
  //   var licence = form.licence.value;
  //   var shopname = form.shop_name.value;
  //   var contact = form.contact.value;
  //   console.log(licence, shopname);
  //   this.register.register(
  //     licence,
  //     this.fname,
  //     shopname,
  //     contact,
  //     this.password,
  //     this.address,
  //     this.user
  //   );
  // }
  // registerLab(form) {
  //   var licence = form.licence.value;
  //   var shopname = form.lab_name.value;
  //   var contact = form.contact.value;
  //   //  console.log(licence , shopname)
  //   this.register.register(
  //     licence,
  //     this.name,
  //     shopname,
  //     contact,
  //     this.password,
  //     this.address,
  //     this.user
  //   );
  // }

  registerDoc(form) {
    this.specialities.forEach(spec => {
      this.selectedItems.push(spec.speciality);
    });
    this.register.registeDoc(
      this.fname,
      this.lname,
      this.password,
      this.blood,
      this.dob,
      this.user,
      this.fname,
      this.selectedItems,
      this.specialities,
      form.licence.value,
      form.degree.value,
      form.work_name.value,
      form.work_contact.value,
      form.work_address.value
    );
  }
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
}
