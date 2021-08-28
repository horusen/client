import { BureauService } from "src/app/zental/bureau/bureau.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-profil-bureau",
  templateUrl: "./profil-bureau.component.html",
  styleUrls: ["./profil-bureau.component.scss"],
})
export class ProfilBureauComponent
  extends BaseSingleComponent
  implements OnInit
{
  affecter = false;
  edit = false;
  constructor(
    public bureauService: BureauService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(bureauService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  affecterBureau(): void {
    this.affecter = true;
    this.helper.toggleModal("affecter-bureau-modal");
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.bureauService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
        this.router.navigate([".."], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    });
  }

  modifier(): void {
    this.edit = true;
    this.helper.toggleModal("bureau-edit-modal");
  }

  onBureauEdit(bureau: any): void {
    this.single = bureau;
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("bureau-edit-modal");
  }
}
