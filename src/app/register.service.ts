import { Injectable, TestabilityRegistry } from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import { Router } from '@angular/router';
  import {ToastrService} from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient, private router: Router,private Toastr:ToastrService) { }

  register(licence , name,shop_name,contact,password,address,user){
    //console.log("in registershop");
    this.http.post("http://localhost:8000/register",{licence , name,shop_name,contact,password,address,user})
    .subscribe((response: any)=> {
      if(response.success)
      {
        console.log("Inserted Successfully")
        this.Toastr.success("Registration of medical shop successfull!!")
      }

    })

  }
}
