import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-show",
  templateUrl: "./groupe-show.component.html",
  styleUrls: ["./groupe-show.component.scss"],
})
export class GroupeShowComponent extends BaseSingleComponent implements OnInit {
  activeComponents = {
    details: true,
    tache: false,
    membre: false,
  };
  constructor(
    public groupeService: GroupeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(groupeService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.getSingle(params["id"]);

        this.route.fragment.subscribe((fragment) => {
          if (fragment) {
            this.resetComponent();
            this.activeComponents[fragment] = true;
          } else {
            this.router.navigate(["./"], {
              relativeTo: this.route,
              fragment: "details",
            });
          }
        });
      }
    });
  }

  getSingle(idGroupe: number) {
    this.loading = true;
    this.groupeService.getSingle(idGroupe).subscribe(() => {
      this.loading = false;
    });
  }

  // permet de desactiver tous les sous component
  resetComponent() {
    Object.keys(this.activeComponents).forEach((key) => {
      this.activeComponents[key] = false;
    });
  }
}
