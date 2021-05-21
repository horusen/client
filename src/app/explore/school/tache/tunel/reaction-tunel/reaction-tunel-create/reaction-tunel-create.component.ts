import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { ReactionService } from "src/app/explore/school/reaction/reaction.service";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EnregistreurAudioService } from "src/app/shared/enregistreur/enregistreur-audio.service";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { TunelService } from "../../tunel.service";

@Component({
  selector: "app-reaction-tunel-create",
  templateUrl: "./reaction-tunel-create.component.html",
  styleUrls: ["./reaction-tunel-create.component.scss"],
})
export class ReactionTunelCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @ViewChild("optionsButton", { static: false }) optionsButton: ElementRef;
  rebondissement: any;
  tunel: any;
  showEmojiPicker: boolean = false;
  constructor(
    public reactionService: ReactionService,
    public tunelService: TunelService,
    public enregistreurService: EnregistreurAudioService,
    public imageService: ImageHandlerService,
    public documentService: DocumentHandlerService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Subscribe to tunel
    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.tunel = tunel;

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
    this._subscription["rebondissement"] =
      this.reactionService.rebondissement$.subscribe((rebondissement) => {
        this.rebondissement = rebondissement;
      });
  }

  initialiseForm() {
    this.form = this.fb.group({
      tunel: [this.tunel.id, Validators.required],
      reaction: ["", Validators.required],
      rebondissement: [],
      type_reaction: [2, Validators.required],
      file: [],
    });

    this.formData = new FormData();
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

  addEmoji(event: any) {
    const text = `${this.form.controls.reaction.value}${event.emoji.native}`;
    this.formValuePatcher("reaction", text);
  }

  create() {
    if (this.form.controls.reaction.value || this.formData.has("file")) {
      this.loading = true;

      // Rebondissement set
      this.formValuePatcher(
        "rebondissement",
        this.rebondissement ? this.rebondissement.id : null
      );

      // From reactive form to FormData
      Object.keys(this.helper.omitNullValueInObject(this.form.value)).forEach(
        (key) => {
          this.formData.append(key, this.form.controls[key].value);
        }
      );

      // Send data to server
      this.reactionService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.rebondissement = null;
        this.initialiseForm();
        this.optionsButton.nativeElement.checked = false;
      });
    }
  }
}
