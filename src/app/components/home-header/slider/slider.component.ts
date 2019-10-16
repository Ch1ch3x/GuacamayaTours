import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit {

  constructor() { }
  imageObject: Array<object> = [{
    image: 'assets/img/5011953823_19b9a06d1a_b.jpg',
    thumbImage: 'assets/img/5011953823_19b9a06d1a_b.jpg',
    alt: 'Tucacas, Estado Falcon',
    title: 'Tucacas, Estado Falcon'
}, {
    image: 'assets/img/MargaritaCastle.jpg',
    thumbImage: 'assets/img/MargaritaCastle.jpg',
    alt: 'Margarita, Estado Nueva Esparta',
    title: 'Margarita, Estado Nueva Esparta'
}, {
  image: 'assets/img/Cayo.jpg',
  thumbImage: 'assets/img/Cayo.jpg',
  alt: 'Higuerote, Estado Miranda',
  title: 'Higuerote, Estado Miranda'
}, {
  image: 'assets/img/5011953823_19b9a06d1a_b.jpg',
thumbImage: 'assets/img/5011953823_19b9a06d1a_b.jpg',
alt: 'Tucacas, Estado Falcon',
title: 'Tucacas, Estado Falcon'
}, {
image: 'assets/img/MargaritaCastle.jpg',
thumbImage: 'assets/img/MargaritaCastle.jpg',
alt: 'Margarita, Estado Nueva Esparta',
title: 'Margarita, Estado Nueva Esparta'
}, {
image: 'assets/img/Cayo.jpg',
thumbImage: 'assets/img/Cayo.jpg',
alt: 'Higuerote, Estado Miranda',
title: 'Higuerote, Estado Miranda'
}, {
  image: 'assets/img/5011953823_19b9a06d1a_b.jpg',
thumbImage: 'assets/img/5011953823_19b9a06d1a_b.jpg',
alt: 'Tucacas, Estado Falcon',
title: 'Tucacas, Estado Falcon'
}, {
image: 'assets/img/MargaritaCastle.jpg',
thumbImage: 'assets/img/MargaritaCastle.jpg',
alt: 'Margarita, Estado Nueva Esparta',
title: 'Margarita, Estado Nueva Esparta'
}, {
image: 'assets/img/Cayo.jpg',
thumbImage: 'assets/img/Cayo.jpg',
alt: 'Higuerote, Estado Miranda',
title: 'Higuerote, Estado Miranda'
}, {
  image: 'assets/img/5011953823_19b9a06d1a_b.jpg',
thumbImage: 'assets/img/5011953823_19b9a06d1a_b.jpg',
alt: 'Tucacas, Estado Falcon',
title: 'Tucacas, Estado Falcon'
}, {
image: 'assets/img/MargaritaCastle.jpg',
thumbImage: 'assets/img/MargaritaCastle.jpg',
alt: 'Margarita, Estado Nueva Esparta',
title: 'Margarita, Estado Nueva Esparta'
}, {
image: 'assets/img/Cayo.jpg',
thumbImage: 'assets/img/Cayo.jpg',
alt: 'Higuerote, Estado Miranda',
title: 'Higuerote, Estado Miranda'
}
];
  ngOnInit() {
  }

}

