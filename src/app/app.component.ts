import { ResponseData } from './ResponseData';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bird-identification-web';
  showApp:boolean=false;
  
  constructor(private sanitizer: DomSanitizer,private http: HttpClient) { }

  showUploadScreen(){
    this.showApp = true;
  }


}
