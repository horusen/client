import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { IciMonPaysService } from "src/app/zental/ici-mon-pays.service";
import { MinistreGouvernementService } from "../ministre-gouvernement.service";

@Component({
  selector: "app-ministre-gouvernement-list",
  templateUrl: "./ministre-gouvernement-list.component.html",
  styleUrls: ["./ministre-gouvernement-list.component.scss"],
})
export class MinistreGouvernementListComponent
  extends BaseCreateComponent
  implements OnInit
{
  constructor(
    public ministreService: MinistreGouvernementService,
    public iciMonPaysService: IciMonPaysService,
    public route: ActivatedRoute
  ) {
    super(ministreService);
  }

  ngOnInit(): void {
    this.iciMonPaysService.pays$.subscribe((pays) => {
      this.route.queryParams.subscribe((params) => {
        this.getByPays(pays.id, params);
      });
    });
  }

  getByPays(pays: number, params: Params): void {
    this.loading = true;
    this.ministreService.getByPays(pays, params).subscribe(() => {
      this.loading = false;
    });
  }
}
