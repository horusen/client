import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ProfilService } from "./profil.service";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent extends BaseComponent implements OnInit {
  addProfil: boolean = false;

  constructor(
    public profilService: ProfilService,
    public route: ActivatedRoute
  ) {
    super(profilService);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
      }
    });
  }

  ajouter() {
    this.addProfil = true;
    this.helper.toggleModal("profil-create-modal");
  }
}
