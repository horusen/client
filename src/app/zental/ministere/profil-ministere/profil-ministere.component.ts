import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-profil-ministere",
  templateUrl: "./profil-ministere.component.html",
  styleUrls: ["./profil-ministere.component.scss"],
})
export class ProfilMinistereComponent
  extends BaseSingleComponent
  implements OnInit, AfterViewInit
{
  edit: boolean = false;
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "edit-ministere") {
        this.edit = true;
        this.helper.toggleModal("ministere-edit-modal");
      }
    });
  }
}
