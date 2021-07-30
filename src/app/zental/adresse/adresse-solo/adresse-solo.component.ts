import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";
import { AdresseService } from "../adresse.service";

@Component({
  selector: "app-adresse-solo",
  templateUrl: "./adresse-solo.component.html",
  styleUrls: ["./adresse-solo.component.scss"],
})
export class AdresseSoloComponent implements OnInit {
  @Input() adresse: any;
  loading = false;
  constructor(public adresseService: AdresseService, public helper: Helper) {}

  ngOnInit(): void {}

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.adresseService.delete(this.adresse.id).subscribe(() => {
        this.loading = false;
      });
    });
  }

  modifier(): void {
    this.adresseService.singleData = this.adresse;
  }
}
