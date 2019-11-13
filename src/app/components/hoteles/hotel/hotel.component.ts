import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { FirestoreService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  private hoteles: any[] = [];
  private hotel: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.hotel = this.route.snapshot.params['id']
    
    this.fireStoreService.getAll("hoteles").subscribe(hoteles => {
      hoteles.docs.map(hotel => {
        this.hoteles.push(hotel.data());
      });
    });
  }

}
