import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-domaine-classe-solo",
  templateUrl: "./domaine-classe-solo.component.html",
  styleUrls: ["./domaine-classe-solo.component.scss"],
})
export class DomaineClasseSoloComponent implements OnInit {
  @Input() domaine: any;
  @Input() index: number;
  afficherSousDomaines: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
