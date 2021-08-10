import { DomaineService } from "./../domaine.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-domaine-show",
  templateUrl: "./domaine-show.component.html",
  styleUrls: ["./domaine-show.component.scss"],
})
export class DomaineShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  edit = false;
  constructor(
    public domaineService: DomaineService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(domaineService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  modifier(): void {
    this.edit = true;
    this.helper.toggleModal("domaine-edit-modal");
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.domaineService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
