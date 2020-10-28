import { Fichier } from "./../../models/fichier.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { Helper } from "../../services/helper";
import { ImageViewerService } from "../image-viewer.service";

@Component({
  selector: "app-image-viewer",
  templateUrl: "./image-viewer.component.html",
  styleUrls: ["./image-viewer.component.css"],
})
export class ImageViewerComponent implements OnInit, OnDestroy {
  image: Fichier;
  private _subscriptions = {
    image: null,
  };

  constructor(
    public imageViewerService: ImageViewerService,
    public helper: Helper
  ) {}

  ngOnInit() {
    this._subscriptions.image = this.imageViewerService.ready$.subscribe(() => {
      this.helper.toggleModal("image-viewer-modal");
    });
  }

  ngOnDestroy() {
    this.helper.unsubscribe(this._subscriptions);
  }

  close() {
    this.helper.toggleModal("image-viewer-modal");
  }

  // next() {
  //   console.log(this.index);
  //   console.log(this.data);

  //   if (this.index < this.data.length - 1) {
  //     this.index++;
  //     this.src = this.data[this.index].fichier_joint.path;
  //     console.log("next ok");
  //   }

  //   console.log("next");
  // }

  // previous() {
  //   if (this.index > 0) {
  //     this.index--;
  //     this.src = this.data[this.index].fichier_joint.path;
  //     console.log("previous ok");
  //   }

  //   console.log("previous");
  // }
}
