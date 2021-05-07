import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ClasseService } from "../classe.service";

@Component({
  selector: "app-classe-list-by-etablissement",
  templateUrl: "./classe-list-by-etablissement.component.html",
  styleUrls: ["./classe-list-by-etablissement.component.scss"],
})
export class ClasseListByEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public classeService: ClasseService,
    public etablissementService: EtablissementService,
    public route: ActivatedRoute
  ) {
    super(classeService);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["etablissement"]) {
        this.getData(params["etablissement"]);
      }
    });

    this.etablissementService.singleData$.subscribe(etablissement => {
      this.getData(etablissement.id)
    })
  }

  getData(etablissement: number) {
    this.loading = true;
    this.classeService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }
}
