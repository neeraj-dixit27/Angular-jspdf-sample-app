import { Component } from '@angular/core';
// import * as html2canvas from "html2canvas";
declare let html2canvas: any;
declare let jsPDF: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'html2canvas capture in Angular';

  capturedImage;
  constructor() {

  }

  clickme() {
    html2canvas(document.querySelector("#capture")).then(canvas => {

      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'JPEG', 5, 20);
      doc.save('testCanvas.pdf');

      /// document.body.appendChild(canvas);
      this.capturedImage = canvas.toDataURL();
      var myImage = canvas.toDataURL("image/png");
      window.open(myImage);

      console.log("canvas.toDataURL() -->" + this.capturedImage);
      // this will contain something like (note the ellipses for brevity), console.log cuts it off 
      // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa0AAAB3CAYAAACwhB/KAAAXr0lEQVR4Xu2dCdiNZf7HP/ZQkpQtaUxDjYYoTSYlURMhGlmKa..."


      canvas.toBlob(function (blob) {

        //  just pass blob to something expecting a blob
        // somfunc(blob);

        // Same as canvas.toDataURL(), just longer way to do it.
        var reader = new FileReader();
        debugger;
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          console.log("Base64--> " + base64data);
        }

      });


    });
  }
}
