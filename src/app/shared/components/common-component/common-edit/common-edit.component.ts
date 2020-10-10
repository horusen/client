// import { FormControl } from "@angular/forms";
// import { HelperService } from "src/app/Facade/shared/service/helper.service";
// import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { FactoryService } from "src/app/Facade/shared/service/factory.service";
// import { AuthService } from "src/app/Facade/service/authentication/auth.service";
// import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { NgIf } from "@angular/common";

// @Component({
//   selector: "app-common-edit",
//   templateUrl: "./common-edit.component.html",
//   styleUrls: ["./common-edit.component.css"]
// })
// export class CommonEditComponent implements OnInit {
//   protected userID: number;
//   @Output() lastItemEdited = new EventEmitter<{ name: string; item: any }>();
//   protected loading: boolean = false;

//   @Input() configuration = {
//     endpoint: null,
//     name: null,
//     hasDescription: false,
//     item: null
//   };

//   // @Input() extraFields: any;
//   protected form: FormGroup;
//   protected Editor = ClassicEditor;
//   constructor(
//     private fb: FormBuilder,
//     private helper: HelperService,
//     private factory: FactoryService,
//     private auth: AuthService
//   ) {}

//   ngOnInit() {
//     console.log(this.configuration.item);
//     if (this.configuration.item) {
//       this.form = this.fb.group({
//         libelle: [this.configuration.item.libelle, Validators.required],
//         inscription: [""]
//       });
//     }
//     if (this.configuration.hasDescription) {
//       this.form.addControl(
//         "description",
//         new FormControl(this.configuration.item.description)
//       );
//     }

//     // if (this.extraFields && Object.keys(this.extraFields)[0]) {
//     //   Object.keys(this.extraFields).forEach((key) => {
//     //     this.form.addControl(key, new FormControl(this.extraFields[key]));
//     //   });
//     // }

//     this.auth.user$.subscribe(id => (this.userID = id));
//   }

//   edit() {
//     this.loading = true;
//     this.factory
//       .updateWE(
//         this.configuration.endpoint,
//         this.configuration.item.id,
//         this.form.value
//       )
//       .subscribe(
//         data => {
//           const output = { name: this.configuration.name, item: data };
//           this.lastItemEdited.emit(output);
//         },
//         () => {},
//         () => {
//           this.loading = false;
//           this.helper.toastAdded();
//         }
//       );
//   }
// }
