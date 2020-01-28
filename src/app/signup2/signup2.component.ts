import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RegisterService } from "../register.service";
import { ToastrService } from "ngx-toastr";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.css"]
})
export class Signup2Component implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  drop=[];
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
  public item;
  public items;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private Toastr: ToastrService,
    private register: RegisterService
  ) {}
  
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Full Blood Examination' },
      { item_id: 2, item_text: 'Iron studies' },
      { item_id: 3, item_text: 'TSH (Thyroid Stimulating Hormone) Quantification' },
      { item_id: 4, item_text: 'Urinalysis' },
      { item_id: 5, item_text: 'INR (International Normalized Ratio)' }
    ];
    this.selectedItems = [
      { item_id: 1, item_text: 'Full Blood Examination' },
   ];
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
    //  allowSearchFilter: true
    };
   

  
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
    if(this.user == "lab")
    {
    
    var licence =form.licence.value;
    var labname = form.lab_name.value;
    var DOE=form.DOE.value;
    var lab_address=form.address.value;
  //  var l=form.l1.value;
console.log("selected",this.selectedItems);
    //qvar contact = form.contact.value;
    //console.log(licence, shopname);
    this.register.register(
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
      DOE,
      lab_address,
      this.selectedItems

   );
    }
    if(this.user == "medic")
    {
      var licence =form.licence.value;
    var labname = form.lab_name.value;
    var DOE=form.DOE.value;
    var shop_address=form.address.value;
      console.log("medic")
      this.register.registermedic(
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
        DOE,
        shop_address,  
     );

    }
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

