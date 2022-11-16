import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { BureauService } from "./../bureau.service";
import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-bureau-inscription-consulaire",
  templateUrl: "./bureau-inscription-consulaire.component.html",
  styleUrls: ["./bureau-inscription-consulaire.component.scss"],
})
export class BureauInscriptionConsulaireComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public bureauService: BureauService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(bureauService);
  }

  ngOnInit(): void {
    this._subscription["single1"] = this.bureauService.singleData$.subscribe(
      (single) => {
        if (single.liaison) {
          this.single = single;
        } else {
          this.router.navigate(["../"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
        }
      }
    );
  }
}
