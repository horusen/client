import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { FichierService } from "../fichier.service";

@Component({
  selector: "app-fichier-add",
  templateUrl: "./fichier-add.component.html",
  styleUrls: ["./fichier-add.component.scss"],
})
export class FichierAddComponent extends BaseCreateComponent implements OnInit {
  constructor(
    public fichierService: FichierService,
    public imageHandlerService: ImageHandlerService,
    public documentHandleService: DocumentHandlerService
  ) {
    super(fichierService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();
  }

  imageFileAdded(event: any) {
    let file = event.target.files[0];
    this.fileProcess(file, "image");
  }

  documentFileAdded(event: any) {
    let file = event.target.files[0];
    this.fileProcess(file, "image");
  }

  fileProcess(file: File, type: string) {
    if (type == "image") {
      if (this.imageHandlerService.checkImage(file)) {
        file = this.imageHandlerService.compressImage(file);
      } else {
        this.helper.alertDanger();
        return;
      }
    } else if (type == "document") {
      if (!this.documentHandleService.checkDocument(file)) {
        this.helper.alertDanger();
        return;
      }
    }

    this.formData.append("fichier", file);
    this.add();
  }

  add() {
    if (this.formData.get("fichier")) {
      this.loading = true;
      this.fichierService.add(this.formData).subscribe(() => {
        this.loading = false;
      });
    }
  }
}
