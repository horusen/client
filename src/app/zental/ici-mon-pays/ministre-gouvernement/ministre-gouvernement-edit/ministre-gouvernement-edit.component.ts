import { ActivatedRoute } from "@angular/router";
import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { Component, OnInit } from "@angular/core";
import { IciMonPaysService } from "src/app/zental/ici-mon-pays.service";
import { MinistreGouvernementCreateComponent } from "../ministre-gouvernement-create/ministre-gouvernement-create.component";
import { MinistreGouvernementService } from "../ministre-gouvernement.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-ministre-gouvernement-edit",
  templateUrl: "./ministre-gouvernement-edit.component.html",
  styleUrls: ["./ministre-gouvernement-edit.component.scss"],
})
export class MinistreGouvernementEditComponent
  extends MinistreGouvernementCreateComponent
  implements OnInit
{
  ministre: any;
  constructor(
    public ministreService: MinistreGouvernementService,
    public iciMonPaysService: IciMonPaysService,
    public ngxPicaService: NgxPicaService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ministreService, iciMonPaysService, ngxPicaService, router, route);
  }

  ngOnInit(): void {
    this._subscription['ministre'] = this.ministreService.singleData$.subscribe(ministre => {
      this.initialiseForm(ministre);
      this.ministre = ministre;
    })
  }


  update(): void {
    if (this.form.value) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays: this.formValue("pays")[0].id,
      };

      this.fillFormData(data);
      this.ministreService.update(this.ministre.id, this.formData).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.hideModal("ministre-gouvernement-edit-modal");
        this.router.navigate(["./"], { relativeTo: this.route });
      });
    } else {
      this.helper.alertDanger("Formulaire invalide");
    }
  }
}
