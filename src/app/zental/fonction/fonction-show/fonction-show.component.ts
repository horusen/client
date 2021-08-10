import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { FonctionService } from "../fonction.service";

@Component({
  selector: "app-fonction-show",
  templateUrl: "./fonction-show.component.html",
  styleUrls: ["./fonction-show.component.scss"],
})
export class FonctionShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  edit = false;
  constructor(
    public fonctionService: FonctionService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(fonctionService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  modifier(): void {
    this.edit = true;
    this.helper.toggleModal("fonction-edit-modal");
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.fonctionService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
