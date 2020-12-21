import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-list",
  templateUrl: "./groupe-list.component.html",
  styleUrls: ["./groupe-list.component.scss"],
})
export class GroupeListComponent extends BaseComponent implements OnInit {
  constructor(public groupeService: GroupeService) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.groupeService.get().subscribe(() => {
      this.loading = false;
    });
  }
}
