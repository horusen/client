import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-independant-list",
  templateUrl: "./groupe-independant-list.component.html",
  styleUrls: ["./groupe-independant-list.component.scss"],
})
export class GroupeIndependantListComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public groupeService: GroupeService,
    public route: ActivatedRoute
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["domaine"]) {
        this.getByDomaine(params["domaine"]);
      } else {
        this.getData();
      }
    });
  }

  getData() {
    this.loading = true;
    this.groupeService.getGroupeIndependant().subscribe(() => {
      this.loading = false;
    });
  }

  getByDomaine(domaine: number) {
    this.loading = true;
    this.groupeService.getByDomaine(domaine).subscribe(() => {
      this.loading = false;
    });
  }
}
