import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { IciMonPaysService } from "src/app/zental/ici-mon-pays.service";
import { MinistreGouvernementService } from "../ministre-gouvernement.service";

@Component({
  selector: "app-ministre-gouvernement-create",
  templateUrl: "./ministre-gouvernement-create.component.html",
  styleUrls: ["./ministre-gouvernement-create.component.scss"],
})
export class MinistreGouvernementCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  imageUrl: any;
  constructor(
    public ministreService: MinistreGouvernementService,
    public iciMonPaysService: IciMonPaysService,
    public ngxPicaService: NgxPicaService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ministreService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this._subscription["pays"] = this.iciMonPaysService.pays$.subscribe(
      (pays) => {
        this.formValuePatcher("pays", [pays]);
      }
    );
  }

  initialiseForm(ministre?: any): void {
    this.form = this.fb.group({
      prenom: [ministre?.prenom, Validators.required],
      nom: [ministre?.nom, Validators.required],
      titre: [ministre?.titre, Validators.required],
      pays: [ministre ? [ministre.pays] : null, Validators.required],
    });
  }

  onFileChanged(event: any): void {
    let image = event.target.files[0];

    this.formData.append("photo", image);
    this.ngxPicaService
      .resizeImage(image, 150, 150)
      .subscribe((imageRetailler) => {
        this.formData.append(
          "photo_min",
          new File([imageRetailler], imageRetailler.name, {
            type: imageRetailler.type,
          })
        );

        let reader = new FileReader();
        reader.readAsDataURL(imageRetailler);
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
      });
  }

  create(): void {
    if (this.form.value) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays: this.formValue("pays")[0].id,
      };

      this.fillFormData(data);
      this.ministreService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.hideModal("ministre-gouvernement-create-modal");
        this.router.navigate(["./"], { relativeTo: this.route });
      });
    } else {
      this.helper.alertDanger("Formulaire invalide");
    }
  }
}
