import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-fichier",
  templateUrl: "./fichier.component.html",
  styleUrls: ["./fichier.component.scss"],
})
export class FichierComponent implements OnInit {
  constructor(public helper: Helper) {}

  ngOnInit(): void {}
}
