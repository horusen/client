import { IdentiteService } from "src/app/zental/identite/identite.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-identite-details",
  templateUrl: "./identite-details.component.html",
  styleUrls: ["./identite-details.component.scss"],
})
export class IdentiteDetailsComponent extends BaseComponent implements OnInit {
  user: any;
  age: number;
  constructor(public identiteService: IdentiteService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
        this.age = this.getAge(user.date_naissance);
      }
    );
  }

  getAge(dateNaissance: string): number {
    return Date.parse(dateNaissance);
  }
}
