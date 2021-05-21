import { Component, Input, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EnregistreurAudioService } from "src/app/shared/enregistreur/enregistreur-audio.service";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { DiscussionService } from "../../discussion/discussion.service";
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
  @Input() type: string;
  @Input() min: boolean = false;
  parentID: number;
  showAllButtons: false;
  rebondissement: any;
  showEmojiPicker: boolean = false;
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public enregistreurService: EnregistreurAudioService,
    public imageService: ImageHandlerService,
    public documentService: DocumentHandlerService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["schema"] = this.reactionService.schema$.subscribe(
      () => {
        this.initialiseForm();
      }
    );

    // Subscription to discussion
    if (this.type === "discussion") {
      this._subscription["discussion"] =
        this.discussionService.singleData$.subscribe(
          (discussion) => (this.parentID = discussion.id)
        );
    }

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
    this.initForm([], [], () => {
      this.addControl(this.type, this.parentID, true);

      // A Readapter
      const typeReaction = 1;
      this.addControl("type_reaction", typeReaction, true);
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
