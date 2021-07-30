import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-list",
  templateUrl: "./ministere-list.component.html",
  styleUrls: ["./ministere-list.component.scss"],
})
export class MinistereListComponent extends BaseComponent implements OnInit {
  constructor(public ministereService: MinistereService) {
    super(ministereService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.ministereService.getByCurrentUser().subscribe(() => {
      this.loading = false;
    });
  }

  supprimer(ministere: number): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.ministereService.delete(ministere).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
