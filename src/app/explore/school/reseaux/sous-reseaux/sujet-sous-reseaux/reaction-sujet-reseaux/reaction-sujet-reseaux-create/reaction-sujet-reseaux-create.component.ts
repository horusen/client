import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EnregistreurAudioService } from "src/app/shared/enregistreur/enregistreur-audio.service";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { SujetSousReseauxService } from "../../sujet-sous-reseaux.service";
import { ReactionSujetReseauxService } from "../reaction-sujet-reseaux.service";

@Component({
  selector: "app-reaction-sujet-reseaux-create",
  templateUrl: "./reaction-sujet-reseaux-create.component.html",
  styleUrls: ["./reaction-sujet-reseaux-create.component.scss"],
})
export class ReactionSujetReseauxCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  rebondissement: any;
  sujet: any;
  showEmojiPicker: boolean = false;
  constructor(
    public reactionService: ReactionSujetReseauxService,
    public sujetService: SujetSousReseauxService,
    public enregistreurService: EnregistreurAudioService,
    public imageService: ImageHandlerService,
    public documentService: DocumentHandlerService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Subscribe to sujet
    this._subscription["sujet"] = this.sujetService.singleData$.subscribe(
      (sujet) => {
        this.sujet = sujet;
        this._subscription["schema"] = this.reactionService.schema$.subscribe(
          () => {
            this.initialiseForm();
          }
        );
      }
    );

    // Subscribe to enregitreurService
    this._subscription["file"] = this.enregistreurService.file$.subscribe(
      (file) => {
        this.formData.append("file", file);
        this.create();
      }
    );

    // Subscribe to rebondissement
    this._subscription[
      "rebondissement"
    ] = this.reactionService.rebondissement$.subscribe((rebondissement) => {
      this.rebondissement = rebondissement;
    });
  }

  initialiseForm() {
    this.initForm(["sujet"], [], () => {
      this.formValuePatcher("sujet", this.sujet.id);

      this.formData = new FormData();
    });
  }

  addEmoji(event) {
    const text = `${this.form.controls.reaction.value}${event.emoji.native}`;
    this.formValuePatcher("reaction", text);
  }

  enregistrer() {
    this.enregistreurService.enregistrer();
  }

  annulerEnregistrement() {
    this.enregistreurService.annulerEnregistrement();
  }

  stopEnregistrer() {
    this.enregistreurService.stopEnregistrer();
  }

  imageFileProcess(event: any) {
    const file = event.target.files[0];
    if (this.imageService.checkImage(file)) {
      this.formData.append("file", file);
      this.create();
    }
  }

  pdfFileProcess(event: any) {
    const file = event.target.files[0];
    if (this.documentService.checkDocument(file)) {
      this.formData.append("file", file);
      this.create();
    }
  }

  create() {
    if (this.form.controls.reaction.value || this.formData.has("file")) {
      this.loading = true;
      this.formValuePatcher(
        "rebondissement",
        this.rebondissement ? this.rebondissement.id : null
      );

      Object.keys(this.helper.omitNullValueInObject(this.form.value)).forEach(
        (key) => {
          this.formData.append(key, this.form.controls[key].value);
        }
      );

      this.reactionService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.rebondissement = null;
        this.initialiseForm();
      });
    }
  }
}
