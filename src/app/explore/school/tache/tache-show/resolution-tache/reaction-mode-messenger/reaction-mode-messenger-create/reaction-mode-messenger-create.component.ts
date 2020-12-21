import { EnregistreurAudioService } from "./../../../../../../../shared/enregistreur/enregistreur-audio.service";
import { ReactionResolutionTacheService } from "./../../resolution-tache/reaction-resolution-tache.service";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { AffectationTacheService } from "../../../../affectation-tache/affectation-tache.service";

@Component({
  selector: "app-reaction-mode-messenger-create",
  templateUrl: "./reaction-mode-messenger-create.component.html",
  styleUrls: ["./reaction-mode-messenger-create.component.scss"],
})
export class ReactionModeMessengerCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  rebondissement: any;
  affectationTache: any;
  showEmojiPicker: boolean = false;
  constructor(
    public reactionService: ReactionResolutionTacheService,
    public affectationTacheService: AffectationTacheService,
    public enregistreurService: EnregistreurAudioService,
    public imageService: ImageHandlerService,
    public documentService: DocumentHandlerService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Subscribe to affectationTache
    this._subscription[
      "affectationTache"
    ] = this.affectationTacheService.singleData$.subscribe(
      (affectationTache) => {
        this.affectationTache = affectationTache;
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
    this.initForm(["affectation_tache"], [], () => {
      this.valuePatcher("affectation_tache", this.affectationTache.id);

      this.formData = new FormData();
    });
  }

  addEmoji(event) {
    const text = `${this.form.controls.reaction.value}${event.emoji.native}`;
    this.valuePatcher("reaction", text);
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
      this.valuePatcher(
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
