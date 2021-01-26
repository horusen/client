import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { TunelService } from "../../tunel.service";
import { ReactionTunelService } from "../reaction-tunel.service";

@Component({
  selector: "app-reaction-tunel-create",
  templateUrl: "./reaction-tunel-create.component.html",
  styleUrls: ["./reaction-tunel-create.component.scss"],
})
export class ReactionTunelCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  rebondissement: any;
  tunel: any;
  showEmojiPicker: boolean = false;
  constructor(
    public reactionTunelService: ReactionTunelService,
    public tunelService: TunelService
  ) {
    super(reactionTunelService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Subscribe to tunel
    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.tunel = tunel;

        this._subscription[
          "schema"
        ] = this.reactionTunelService.schema$.subscribe(() => {
          this.initialiseForm();
        });
      }
    );

    // Subscribe to rebondissement
    this._subscription[
      "rebondissement"
    ] = this.reactionTunelService.rebondissement$.subscribe(
      (rebondissement) => {
        this.rebondissement = rebondissement;
      }
    );
  }

  initialiseForm() {
    this.initForm(["tunel", "reaction"], [], () => {
      this.formValuePatcher("tunel", this.tunel.id);
    });

    this.formData = new FormData();
  }

  addEmoji(event: any) {
    const text = `${this.form.controls.reaction.value}${event.emoji.native}`;
    this.formValuePatcher("reaction", text);
  }

  create() {
    if (this.form.valid) {
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
      this.reactionTunelService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.rebondissement = null;
        this.initialiseForm();
      });
    }
  }
}
