import { IdentiteService } from "src/app/zental/identite/identite.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AdresseService } from "../../adresse/adresse.service";

@Component({
  selector: "app-identite-details",
  templateUrl: "./identite-details.component.html",
  styleUrls: ["./identite-details.component.scss"],
})
export class IdentiteDetailsComponent extends BaseComponent implements OnInit {
  user: any;
  age: number;
  // addresses = [];
  constructor(
    public identiteService: IdentiteService,
    public addresseService: AdresseService
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        this.user = user;
        this.age = this.getAge(user.date_naissance);
      }
    );

    this._subscription["addresse"] =
      this.addresseService.lastItemcreated$.subscribe({
        next: (addresse) => {
          this.user.addresse = addresse;
          this.auth.setUserField("addresse", addresse);
        },
      });

    this._subscription["addresse2"] =
      this.addresseService.lastItemEdited$.subscribe({
        next: (addresse) => {
          this.user.addresse = addresse;
          this.auth.setUserField("addresse", addresse);
        },
      });
  }

  getAge(dateNaissance: string): number {
    return Date.parse(dateNaissance);
  }

  // getAddresses(user: number): void {
  //   // this.loading = true;
  //   this.addresseService.getByUser(user).subscribe({
  //     next: (addresses) => {
  //       this.addresses = addresses;
  //       // this.loading = false;
  //     },
  //   });
  // }
}
