import { ResponseData } from './../ResponseData';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-image-component',
  templateUrl: './upload-image-component.component.html',
  styleUrls: ['./upload-image-component.component.css']
})
export class UploadImageComponentComponent implements OnInit {

  imgFile:any;
  imgUrl:any;
  imgExist:boolean = false;
  birdData!:ResponseData[];
  isFetching:boolean = false;
  constructor(private sanitizer: DomSanitizer,private http: HttpClient) { }

  ngOnInit(): void {
  }

  onUpload(event:any){
    this.imgExist = false;
    this.imgFile = event.target.files[0];
    if(this.imgFile!=null){
      this.imgExist = true;
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.imgFile));
    }
    //console.log(this.imgFile);
    //console.log(this.imgUrl);
  }
  onPredict(){
    let formData = new FormData();
    formData.append('file', this.imgFile);
    this.isFetching = true;
    let response = this.http.post<ResponseData[]>('https://aves-api.adaptable.app/predict-top5',formData);
    response.subscribe(
      (data)=>{
        this.birdData= data;
        //console.log(this.birdData);
        this.isFetching = false;
      }
    );
  }


}
