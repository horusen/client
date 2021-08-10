import { MinistereService } from "./../../ministere/ministere.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { LiaisonService } from "../liaison.service";
import { AmbassadeService } from "../../ambassade/ambassade.service";

@Component({
  selector: "app-liaison-show",
  templateUrl: "./liaison-show.component.html",
  styleUrls: ["./liaison-show.component.scss"],
})
export class LiaisonShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  affecter = false;
  edit = false;
  ministere: any;
  ambassade: any;
  constructor(
    public liaisonService: LiaisonService,
    public route: ActivatedRoute,
    public router: Router,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService
  ) {
    super(liaisonService);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();

    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this.ministere = ministere;
          console.log("ministere");
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this.ambassade = ambassade;
        });
    }
  }

  affecterLiaison(): void {
    this.affecter = true;
    this.helper.toggleModal("affecter-liaison-modal");
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.liaisonService.delete(this.single.id).subscribe(() => {
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
    this.helper.toggleModal("liaison-edit-modal");
  }
}
