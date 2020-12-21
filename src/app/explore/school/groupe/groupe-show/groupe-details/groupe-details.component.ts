import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { GroupeService } from "../../groupe.service";

@Component({
  selector: "app-groupe-details",
  templateUrl: "./groupe-details.component.html",
  styleUrls: ["./groupe-details.component.scss"],
})
export class GroupeDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  showEdit: boolean = false; // Permet d'afficher et de cacher le component edit
  constructor(
    public groupeService: GroupeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(groupeService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  delete() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.groupeService.delete(this.single.id).subscribe(() => {
        this.router.navigate(["/groupe"]);
        this.loading = false;
      });
    });
  }
}
