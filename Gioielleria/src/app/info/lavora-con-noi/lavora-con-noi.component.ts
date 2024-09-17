import { Component } from '@angular/core';

@Component({
  selector: 'app-lavora-con-noi',
  templateUrl: './lavora-con-noi.component.html',
  styleUrls: ['./lavora-con-noi.component.css']
})
export class LavoraConNoiComponent {


  onSubmit() {
    alert('Grazie per aver inviato la tua candidatura!');
  }

}
