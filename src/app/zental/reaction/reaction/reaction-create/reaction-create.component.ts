import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EnregistreurAudioService } from "src/app/shared/enregistreur/enregistreur-audio.service";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { DiscussionService } from "../../../toloba/discussion/discussion/discussion.service";
import { ReactionService } from "../reaction.service";

@Component({
  selector: "app-reaction-create",
  templateUrl: "./reaction-create.component.html",
  styleUrls: ["./reaction-create.component.scss"],
})
export class ReactionCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  discussion: any;
  rebondissement: any;
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public documentService: DocumentHandlerService,
    public enregistreurService: EnregistreurAudioService,
    public imageHandlerService: ImageHandlerService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription["discussion"] =
      this.discussionService.singleData$.subscribe((discussion) => {
        if (discussion) {
          this.discussion = discussion;
          this.initialiseForm();
        }
      });

    this._subscription["file"] = this.enregistreurService.file$.subscribe(
      (file) => {
        this.formData.append("file", file);
        this.create();
      }
    );

    this._subscription["rebondissement"] =
      this.reactionService.rebondissement$.subscribe((rebondissement) => {
        this.rebondissement = rebondissement;
      });
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      discussion: [this.discussion.id, Validators.required],
      reaction: [null, Validators.required],
      rebondissement: [null, Validators.required],
    });
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

  addEmoji(event: any) {
    const text = `${this.form.controls.reaction.value}${event.emoji.native}`;
    this.formValuePatcher("reaction", text);
  }

  imageFileProcess(event: any) {
    const file = event.target.files[0];
    if (this.imageHandlerService.checkImage(file)) {
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

  annulerRebondissement(): void {
    this.rebondissement = null;
  }

  create(): void {
    if (this.form.controls.reaction.value || this.formData.has("file")) {
      this.loading = true;

      this.formValuePatcher(
        "rebondissement",
        this.rebondissement ? this.rebondissement.id : null
      );

      // From reactive form to form data
      this.fillFormData(this.helper.omitNullValueInObject(this.form.value));

      // Add data to the server
      this.reactionService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.rebondissement = null;
        this.initialiseForm();
        this.formData = new FormData();
      });
    } else {
      this.helper.alertDanger("Erreur lors de l'envoie du message");
    }
  }
}
