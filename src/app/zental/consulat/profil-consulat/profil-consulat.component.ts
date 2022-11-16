import { ActivatedRoute, Router } from "@angular/router";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-profil-consulat",
  templateUrl: "./profil-consulat.component.html",
  styleUrls: ["./profil-consulat.component.scss"],
})
export class ProfilConsulatComponent
  extends BaseSingleComponent
  implements OnInit, AfterViewInit
{
  edit = false;
  constructor(
    public consulatService: ConsulatService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(consulatService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "edit-consulat") {
        this.edit = true;
        this.helper.toggleModal("consulat-edit-modal");
      }
    });
  }
}
