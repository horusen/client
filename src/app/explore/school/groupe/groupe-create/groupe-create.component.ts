import { keyframes } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { ClasseService } from "../../classe/classe.service";
import { ConfidentialiteService } from "../../confidentialite/confidentialite.service";
import { DomaineService } from "../../domaine/domaine.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-create",
  templateUrl: "./groupe-create.component.html",
  styleUrls: ["./groupe-create.component.scss"],
})
export class GroupeCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  @Input() displayBy: string;
  imageUrl: any;

  dependancies = {
    domaines: [],
    classes: [],
    confidentialites: [],
  };

  dependanciesLoading = {
    domaine: false,
    classe: false,
    confidentialite: false,
  };
  constructor(
    public groupeService: GroupeService,
    public domaineService: DomaineService,
    public classeService: ClasseService,
    public confidentialiteService: ConfidentialiteService,
    public router: Router,
    public ngxPicaService: NgxPicaService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this._subscription["schema"] = this.groupeService.schema$.subscribe(() => {
      this.initialiseForm();
    });

    this.getDependancies();

    this.subscribeToDependancies();
  }

  initialiseForm() {
    this.isFormOk = false;
    this.initForm(
      ["libelle", "confidentialite", "type", "description", "etat"],
      [],
      () => {
        this.valuesPatcher(["etat"], [1]);

        switch (this.displayBy) {
          case "professeur":
            this.formValuePatcher("type", 4);
            break;
          case "groupesIndependants":
            this.formValuePatcher("type", 2);
            break;
          default:
            this.formValuePatcher("type", 1);
            break;
        }

        this.displayBy == "classe" ? this.addControl("classe", [], true) : null;
        this.addControl("domaines", [], true);
      }
    );
  }

  onFileChanged(event) {
    let image = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    this.formData.append("image", image);
    this.ngxPicaService
      .resizeImage(image, 35, 35)
      .subscribe((imageRetailler) => {
        this.formData.append(
          "image_min",
          new File([imageRetailler], imageRetailler.name, {
            type: imageRetailler.type,
          })
        );
      });
  }

  subscribeToDependancies() {
    // domaine
    this._subscription["domaine"] = this.domaineService.data$.subscribe(
      (data) => (this.dependancies.domaines = data)
    );

    // classe
    if (this.displayBy == "classe") {
      this._subscription["classe"] = this.classeService.data$.subscribe(
        (data) => (this.dependancies.classes = data)
      );
    }
    // confidentialite
    this._subscription[
      "confidentialie"
    ] = this.confidentialiteService.data$.subscribe(
      (data) => (this.dependancies.confidentialites = data)
    );
  }

  getDependancies() {
    // domaine
    this.dependanciesLoading.domaine = true;
    this.domaineService.get().subscribe(() => {
      this.dependanciesLoading.domaine = false;
    });

    if (this.displayBy == "classe") {
      // Classe
      this.dependanciesLoading.classe = true;
      this.classeService.get().subscribe(() => {
        this.dependanciesLoading.classe = false;
      });
    }

    // Confidentialite
    this.dependanciesLoading.confidentialite = true;
    this.confidentialiteService.get().subscribe(() => {
      this.dependanciesLoading.confidentialite = false;
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        domaines: this.helper.idExtractor(this.formValue("domaines")),
        confidentialite: this.formValue("confidentialite")[0].id,
        classe:
          this.displayBy == "classe" ? this.formValue("classe")[0].id : null,
        ...this.helper.omitFieldInObject(this.form.value, [
          "domaines",
          "classe",
          "confidentialite",
        ]),
      };

      Object.keys(data).forEach((key) => {
        if (data[key]) {
          this.formData.append(key, data[key]);
        }
      });

      this.groupeService.add(this.formData).subscribe(
        () => {
          // Form reset
          this.initialiseForm();
          // this.form.reset();
          // this.valuesPatcher(
          //   ["confidentialite", "etat"],
          //   [this.dependancies.confidentialites[0], 1]
          // );

          // switch (this.displayBy) {
          //   case "professeur":
          //     this.formValuePatcher("type", 4);
          //     break;
          //   case "groupesIndependants":
          //     this.formValuePatcher("type", 2);
          //     break;
          //   default:
          //     this.formValuePatcher("type", 1);
          //     break;
          // }

          this.helper.toggleModal("groupe-create-modal");
          this.helper.alertSuccess();
        },
        () => {},
        () => {
          this.loading = false;
        }
      );
    }
  }
}
