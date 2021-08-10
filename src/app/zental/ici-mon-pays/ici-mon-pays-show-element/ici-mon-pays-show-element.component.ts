import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { IciMonPaysService } from "../../ici-mon-pays.service";
import { MinistereService } from "../../ministere/ministere.service";

@Component({
  selector: "app-ici-mon-pays-show-element",
  templateUrl: "./ici-mon-pays-show-element.component.html",
  styleUrls: ["./ici-mon-pays-show-element.component.scss"],
})
export class IciMonPaysShowElementComponent
  extends BaseSingleComponent
  implements OnInit
{
  element: string;
  pays: any;
  onEdit = false;
  constructor(
    public iciMonPaysService: IciMonPaysService,
    public route: ActivatedRoute,
    public ministereService: MinistereService
  ) {
    super(iciMonPaysService, route);
  }

  ngOnInit(): void {
    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.route.params.subscribe((element) => {
          this.element = element.id;
          this.pays = ministere.entite_diplomatique.pays_siege.id;
          this.showElement(
            ministere.entite_diplomatique.pays_siege.id,
            String(element.id)
          );
        });
      });

    this._subscription["single"] = this.iciMonPaysService.singleData$.subscribe(
      (response) => {
        this.single = response;
      }
    );
  }

  showElement(pays: number, element: string): void {
    this.loading = true;
    this.iciMonPaysService.showElement(pays, element).subscribe(() => {
      this.loading = false;
    });
  }
}
