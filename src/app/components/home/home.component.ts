import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  images = ["../../../assets/img/margarita.jpg", "../../../assets/img/roraima(2).png", "../../../assets/img/juangriego.jpg"];
  actividades = ["../../../assets/img/roques.jpg", "../../../assets/img/telefericojpg.jpg"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}
  
  ngOnInit() {}
}
