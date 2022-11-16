import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { PresidentService } from "../president.service";
import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-president-create",
  templateUrl: "./president-create.component.html",
  styleUrls: ["./president-create.component.scss"],
})
export class PresidentCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  imageUrl: any;
  constructor(
    public presidentService: PresidentService,
    public ministereService: MinistereService,
    public ngxPicaService: NgxPicaService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(presidentService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.formValuePatcher("pays", [
          ministere.entite_diplomatique.pays_origine,
        ]);
      });
  }

  initialiseForm(president?: any): void {
    this.form = this.fb.group({
      prenom: [president?.prenom, Validators.required],
      nom: [president?.nom, Validators.required],
      biographie: [president?.biographie, Validators.required],
      pays: [null, Validators.required],
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
      this.presidentService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.toggleModal("president-create-modal");
        this.router.navigate(["./"], { relativeTo: this.route });
      });
    } else {
      this.helper.alertDanger("Formulaire invalide");
    }
  }
}
