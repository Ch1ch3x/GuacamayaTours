import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: 'app-destinos-turisticos',
  templateUrl: './destinos-turisticos.component.html',
  styleUrls: ['./destinos-turisticos.component.scss']
})
export class DestinosTuristicosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
