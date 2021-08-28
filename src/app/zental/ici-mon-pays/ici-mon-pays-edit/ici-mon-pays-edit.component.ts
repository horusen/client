import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { IciMonPaysService } from "../../ici-mon-pays.service";

@Component({
  selector: "app-ici-mon-pays-edit",
  templateUrl: "./ici-mon-pays-edit.component.html",
  styleUrls: ["./ici-mon-pays-edit.component.scss"],
})
export class IciMonPaysEditComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() description: string;
  @Input() pays: any;
  @Input() element: string;
  @Output() done = new EventEmitter();
  constructor(public iciMonPaysService: IciMonPaysService) {
    super(iciMonPaysService);
  }

  ngOnInit(): void {

    this.form = this.initialiseForm(
      this.description,
      this.pays.id,
      this.element
    );
  }

  initialiseForm(
    description: string,
    pays: number,
    element: string
  ): FormGroup {
    return this.fb.group({
      description: [description, Validators.required],
      element: [element, Validators.required],
      pays: [pays, Validators.required],
    });
  }

  edit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.iciMonPaysService.add(this.form.value).subscribe(() => {
        this.loading = false;
        this.done.emit();
      });
    } else {
      this.helper.alertDanger("Formulaire invalide");
    }
  }
}
