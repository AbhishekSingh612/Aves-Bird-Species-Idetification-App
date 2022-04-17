import { BirdDetail } from './../BirdDetail.model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bird-detail-component',
  templateUrl: './bird-detail-component.component.html',
  styleUrls: ['./bird-detail-component.component.css']
})
export class BirdDetailComponentComponent implements OnInit, AfterViewInit{

  @Input() bird!:BirdDetail;
  @ViewChild('varContainer') varContainer!:ElementRef;
  @ViewChild('topImage') topImage!:ElementRef;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.bird);
   /*  var widthc = this.varContainer.nativeElement.offsetWidth ;
    var heightc =this.varContainer.nativeElement.offsetHeight; */
    
    
  }
  ngAfterViewInit(){
    //console.log(this.varContainer);
    this.setTopImage();
  }


  setTopImage(){
    var widthc = this.varContainer.nativeElement.offsetWidth ;
    var heightc = this.varContainer.nativeElement.offsetHeight;
    var widthi = this.topImage.nativeElement.offsetWidth ;
    var heighti = this.topImage.nativeElement.offsetHeight;
    var width = widthc/2 - widthi/2;
    this.topImage.nativeElement.style.left = width+"px";
    this.topImage.nativeElement.style.visibility = "visible";
    //console.log(widthc,heightc);
  }
}
