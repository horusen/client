import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Fichier } from "../models/fichier.model";
import { Helper } from "../services/helper";
import { ImageHandlerService } from "../services/image-handler.service";

@Injectable({
  providedIn: "root",
})
export class ImageViewerService {
  public ready$ = new Subject<boolean>();
  public image: Fichier;
  constructor(
    public imageHandleService: ImageHandlerService,
    public helper: Helper
  ) {}

  displayImage(image: Fichier) {
    if (
      this.helper.checkExtensions(
        image.path,
        this.imageHandleService.acceptedImageExtension
      )
    ) {
      this.image = image;
      this.ready$.next(true);
    }
  }
}
