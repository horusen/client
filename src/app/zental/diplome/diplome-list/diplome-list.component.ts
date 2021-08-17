import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { IdentiteService } from "../../identite/identite.service";
import { DiplomeService } from "../diplome.service";

@Component({
  selector: "app-diplome-list",
  templateUrl: "./diplome-list.component.html",
  styleUrls: ["./diplome-list.component.scss"],
})
export class DiplomeListComponent extends BaseComponent implements OnInit {
  constructor(
    public diplomeService: DiplomeService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute
  ) {
    super(diplomeService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        this.getData(user.id_inscription);
      }
    );
  }

  getData(user: number): void {
    this.loading = true;
    this.diplomeService.getByUser(user).subscribe(() => {
      this.loading = false;
    });
  }
}
