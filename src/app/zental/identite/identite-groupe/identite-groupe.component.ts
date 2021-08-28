import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { IdentiteService } from "../identite.service";

@Component({
  selector: "app-identite-groupe",
  templateUrl: "./identite-groupe.component.html",
  styleUrls: ["./identite-groupe.component.scss"],
})
export class IdentiteGroupeComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public identiteService: IdentiteService) {
    super(identiteService);
  }

  ngOnInit(): void {
    this._subscription["user"] = this.identiteService.user$.subscribe(
      (user) => {
        this.single = user;
      }
    );
  }
}
