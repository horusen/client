import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-list-by-professeur",
  templateUrl: "./groupe-list-by-professeur.component.html",
  styleUrls: ["./groupe-list-by-professeur.component.scss"],
})
export class GroupeListByProfesseurComponent
  extends BaseComponent
  implements OnInit {
  constructor(public groupeService: GroupeService) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.groupeService.getGroupeProfesseurByUserAsProfesseur().subscribe(() => {
      this.loading = false;
    });
  }
}
