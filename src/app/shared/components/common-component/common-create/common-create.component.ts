// import { AuthService } from "src/app/Facade/service/authentication/auth.service";
// import { Input, Output } from "@angular/core";
// import { FormControl } from "@angular/forms";
// import { HelperService } from "./../../../../../shared/service/helper.service";
// import { FactoryService } from "./../../../../../shared/service/factory.service";
// import { CommonService } from "./../../../../../service/admin/common/common.service";
// import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { Component, OnInit, EventEmitter } from "@angular/core";
// import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// @Component({
//   selector: "app-common-create",
//   templateUrl: "./common-create.component.html",
//   styleUrls: ["./common-create.component.css"],
// })
// export class CommonCreateComponent implements OnInit {
//   protected userID: number;
//   @Output() lastItemCreated = new EventEmitter<{ name: string; item: any }>();
//   protected loading: boolean = false;

//   @Input() configuration = {
//     endpoint: null,
//     name: null,
//     hasDescription: false,
//   };

//   @Input() extraFields: any;
//   protected form: FormGroup;
//   protected Editor = ClassicEditor;
//   constructor(
//     private fb: FormBuilder,
//     private helper: HelperService,
//     private factory: FactoryService,
//     private auth: AuthService
//   ) {}

//   ngOnInit() {
//     this.form = this.fb.group({
//       libelle: ["", Validators.required],
//       inscription: [""],
//     });

//     if (this.extraFields && !this.extraFields[0]) {
//       Object.keys(this.extraFields).forEach((key) => {
//         this.form.addControl(key, new FormControl(this.extraFields[key]));
//       });
//     }

//     this.auth.user$.subscribe((id) => (this.userID = id));

//     if (this.configuration.hasDescription) {
//       this.form.addControl("description", new FormControl());
//     }
//   }

//   create() {
//     this.loading = true;
//     this.factory.postWE(this.configuration.endpoint, this.form.value).subscribe(
//       (data) => {
//         const output = { name: this.configuration.name, item: data };
//         this.lastItemCreated.emit(output);
//       },
//       () => {},
//       () => {
//         this.loading = false;
//         this.form.reset();
//         this.helper.toastAdded();
//       }
//     );
//   }
// }
