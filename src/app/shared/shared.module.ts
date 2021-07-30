import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxPicaModule } from "@digitalascetic/ngx-pica";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DpDatePickerModule } from "ng2-date-picker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalComponent } from "./components/modal/modal.component";
// import { CommonCreateComponent } from "./components/common-component/common-create/common-create.component";
// import { CommonEditComponent } from "./components/common-component/common-edit/common-edit.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { MissingDataComponent } from "./components/missing-data/missing-data.component";
import { PageLoadingComponent } from "./components/page-loading/page-loading.component";
import { CommonCreateComponent } from "./components/common-component/common-create/common-create.component";
import { OverlayComponent } from "./components/overlay/overlay.component";
import { ModalSidebarComponent } from "./components/modal-sidebar/modal-sidebar.component";
import { ProfileComponent } from "../profile/profile/profile.component";
import { VoirPlusDirective } from "./directive/voir-plus.directive";
import { ReadMoreComponent } from "./components/read-more.component";
import { ColorPickerModule } from "ngx-color-picker";
import { BaseContainerComponentComponent } from "./component/base-container-component/base-container-component.component";
import { CommonEditComponent } from "./components/common-component/common-edit/common-edit.component";
@NgModule({
  declarations: [
    ModalComponent,
    CommonCreateComponent,
    CommonEditComponent,
    LoadingComponent,
    MissingDataComponent,
    PageLoadingComponent,
    OverlayComponent,
    ModalSidebarComponent,
    ProfileComponent,
    VoirPlusDirective,
    ReadMoreComponent,
    BaseContainerComponentComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    MatTooltipModule,
    AngularMultiSelectModule,
    SweetAlert2Module,
    NgxPicaModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    DpDatePickerModule,
    NgbModule,
    TranslateModule.forChild(),
    PickerModule,
    ColorPickerModule,
  ],
  exports: [
    MatTooltipModule,
    AngularMultiSelectModule,
    SweetAlert2Module,
    NgxPicaModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule,
    DpDatePickerModule,
    NgbModule,
    TranslateModule,
    PickerModule,
    OverlayComponent,
    ModalComponent,
    CommonCreateComponent,
    ModalSidebarComponent,
    CommonEditComponent,
    LoadingComponent,
    MissingDataComponent,
    PageLoadingComponent,
    ProfileComponent,
    ReadMoreComponent,
    ColorPickerModule,
  ],
})
export class SharedModule {}
