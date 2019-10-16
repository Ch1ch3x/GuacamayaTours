import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  imageObject: Array<object> = [{
    image: 'src\assets\img\5011953823_19b9a06d1a_b.jpg',
    thumbImage: 'src\assets\img\5011953823_19b9a06d1a_b.jpg',
    alt: 'Tucacas, Estado Falcon',
    title: 'Tucacas, Estado Falcon'
    }, {image: 'src\assets\img\Cayo.jpg',
    thumbImage: 'src\assets\img\Cayo.jpg',
    title: 'Higuerote, Estado Miranda',
    alt: 'Higuerote, Estado Miranda'
}];
  constructor() {

  }
  ngOnInit() {}
}
