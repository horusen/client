import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MinistreService } from "../../ministre.service";
import { MembreCabinetMinistreService } from "../membre-cabinet-ministre.service";

@Component({
  selector: "app-membre-cabinet-ministre-list",
  templateUrl: "./membre-cabinet-ministre-list.component.html",
  styleUrls: ["./membre-cabinet-ministre-list.component.scss"],
})
export class MembreCabinetMinistreListComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    public membreCabinetService: MembreCabinetMinistreService,
    public ministreService: MinistreService,
    public route: ActivatedRoute
  ) {
    super(membreCabinetService);
  }

  ngOnInit(): void {
    this._subscription["ministre"] = this.ministreService.singleData$.subscribe(
      (ministre) => {
        this.route.queryParams.subscribe((params) => {
          this.getByMinistre(ministre.id, params);
        });
      }
    );
  }

  getByMinistre(ministre: number, params: Params): void {
    this.loading = true;
    this.membreCabinetService.getByMinistre(ministre, params).subscribe(() => {
      this.loading = false;
    });
  }

  supprimer(membre: number) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.membreCabinetService.delete(membre).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }

  modifier(membre: any): void {
    this.membreCabinetService.singleData = membre;
  }
}
