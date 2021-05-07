import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { Helper } from "src/app/shared/services/helper";
import { GroupeService } from "../../groupe/groupe.service";

@Component({
  selector: "app-groupe-list-min",
  templateUrl: "./groupe-list-min.component.html",
  styleUrls: ["./groupe-list-min.component.scss"],
})
export class GroupeListMinComponent extends BaseComponent implements OnInit {
  @Input() styleLight: boolean = true; // Permet d'adapter la couleur du texte en fonction de l'élèment parent
  constructor(public groupeService: GroupeService, public helper: Helper) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.groupeService.get().subscribe((data) => {
      this.data = data;
      this.loading = false;
    });
  }
}
