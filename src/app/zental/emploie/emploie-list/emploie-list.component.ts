import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { IdentiteService } from "../../identite/identite.service";
import { EmploieService } from "../emploie.service";

@Component({
  selector: "app-emploie-list",
  templateUrl: "./emploie-list.component.html",
  styleUrls: ["./emploie-list.component.scss"],
})
export class EmploieListComponent extends BaseComponent implements OnInit {
  user: any;
  constructor(
    public emploieService: EmploieService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute
  ) {
    super(emploieService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        this.user = user;
        this.getData(user.id_inscription);
      }
    );
  }

  getData(user: number): void {
    this.loading = true;
    this.emploieService.getByUser(user).subscribe(() => {
      this.loading = false;
    });
  }
}
