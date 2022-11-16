import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { IciMonPaysService } from "src/app/zental/ici-mon-pays.service";
import { PresidentService } from "../president.service";

@Component({
  selector: "app-president-show",
  templateUrl: "./president-show.component.html",
  styleUrls: ["./president-show.component.scss"],
})
export class PresidentShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public presidentService: PresidentService,
    public iciMonPaysService: IciMonPaysService
  ) {
    super(presidentService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["pays"] = this.iciMonPaysService.pays$.subscribe(
      (pays) => {
        this.getPresident(pays.id);
      }
    );
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.presidentService.delete(this.single.id).subscribe(() => {
        this.single = null;
        this.loading = false;
      });
    });
  }

  getPresident(pays: number): void {
    this.loading = true;
    this.presidentService.getByPays(pays).subscribe(() => {
      this.loading = false;
    });
  }
}
