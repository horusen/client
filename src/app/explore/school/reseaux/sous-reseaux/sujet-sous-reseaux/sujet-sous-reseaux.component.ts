import { SujetSousReseauxService } from "./sujet-sous-reseaux.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-sujet-sous-reseaux",
  templateUrl: "./sujet-sous-reseaux.component.html",
  styleUrls: ["./sujet-sous-reseaux.component.scss"],
})
export class SujetSousReseauxComponent extends BaseComponent implements OnInit {
  constructor(public sujetService: SujetSousReseauxService) {
    super(sujetService);
  }

  ngOnInit(): void {}
}
