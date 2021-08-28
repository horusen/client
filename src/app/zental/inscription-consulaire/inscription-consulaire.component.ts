import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";

@Component({
  selector: "app-inscription-consulaire",
  templateUrl: "./inscription-consulaire.component.html",
  styleUrls: ["./inscription-consulaire.component.scss"],
})
export class InscriptionConsulaireComponent implements OnInit {
  @Input() parent: ParentDefinition;
  constructor() {}

  ngOnInit(): void {}
}
