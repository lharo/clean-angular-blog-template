import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  fileToUpload: File = null
  //urlUpload = '/api/riesgo-cognitivo-api/v1.0/upload/img'
  urlUpload = 'http://localhost:5000/riesgo-cognitivo-api/v1.0/upload/img'
  name:string = ''
  //urlUriName = '/api/riesgo-cognitivo-api/v1.0/identify-image/'
  urlUriName = '/http://localhost:5000/riesgo-cognitivo-api/v1.0/identify-image/'
  //ofacCheckUrl = '/api/riesgo-cognitivo-api/v1.0/check-ofac/'
  ofacCheckUrl = 'http://localhost:5000/riesgo-cognitivo-api/v1.0/check-ofac/'
  //satCheckUrl = '/api/riesgo-cognitivo-api/v1.0/check-sat/'
  satCheckUrl = 'http://localhost:5000/riesgo-cognitivo-api/v1.0/check-sat/'

  ofacData = null
  satData = null

  satDiv = false
  ofacDiv = false

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
  }

  onFileSelected(event){
    this.fileToUpload = <File> event.target.files[0]
  }

  onInputChange(event){
    this.name = event.target.value
  }

  onUpload(){
    let fd = new FormData();
    fd.append('file', this.fileToUpload, this.fileToUpload.name)
    this.http.post(this.urlUpload, fd)
      .subscribe( res => {
        this.getNameFromUri(JSON.parse(JSON.stringify(res)).imgName)
      })
  }

  getNameFromUri(name:string){
    this.urlUriName += name
    this.http.get(this.urlUriName)
      .subscribe(res => {
        this.name = res[0].name
      })
  }

  onCheckOFAC(){
    let name = encodeURIComponent(this.name.trim())
    let url = this.ofacCheckUrl + name
    this.http.get(url)
      .subscribe(res => {
        console.log(res)
        this.ofacData = res
        this.showOFACResults();
      })
  }

  onCheckSAT(){
    let name = encodeURIComponent(this.name.trim())
    let url = this.satCheckUrl + name
    this.http.get(url)
    .subscribe(res => {
      this.satData = res
      this.showSATResults();
    })
  }

  onCheckBoth(){
    this.onCheckOFAC();
    this.showSATResults();
  }

  showSATResults(){
    this.satDiv = true
  }

  showOFACResults(){
    this.ofacDiv = true
  }
}


