import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FileManagerComponent } from "./file-manager.component";
import { FichierComponent } from "./fichier/fichier.component";
import { FichierListComponent } from "./fichier/fichier-list/fichier-list.component";
import { FichierSoloComponent } from "./fichier/fichier-solo/fichier-solo.component";
import { SharedModule } from "../shared/shared.module";
import { DossierComponent } from "./dossier/dossier.component";
import { DossierListComponent } from "./dossier/dossier-list/dossier-list.component";
import { DossierSoloComponent } from "./dossier/dossier-list/dossier-solo/dossier-solo.component";
import { FichierAddComponent } from './fichier/fichier-add/fichier-add.component';
import { PasswordFichierAddComponent } from './fichier/password-fichier/password-fichier-add/password-fichier-add.component';
import { PasswordFichierCheckComponent } from './fichier/password-fichier/password-fichier-check/password-fichier-check.component';
import { PasswordFichierEditComponent } from './fichier/password-fichier/password-fichier-edit/password-fichier-edit.component';
import { PasswordFichierComponent } from './fichier/password-fichier/password-fichier.component';
import { PasswordFichierDeleteComponent } from './fichier/password-fichier/password-fichier-delete/password-fichier-delete.component';
import { HeaderFileManagerComponent } from './header-file-manager/header-file-manager.component';
import { DossierListMinComponent } from './dossier/dossier-list-min/dossier-list-min.component';

const routes: Routes = [
  {
    path: "",
    component: FileManagerComponent,
    children: [
      {
        path: "",
        component: FichierComponent,
      },
      {
        path: "dossier",
        component: DossierComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    FileManagerComponent,
    FichierComponent,
    FichierListComponent,
    FichierSoloComponent,
    DossierComponent,
    DossierListComponent,
    DossierSoloComponent,
    FichierAddComponent,
    PasswordFichierAddComponent,
    PasswordFichierCheckComponent,
    PasswordFichierEditComponent,
    PasswordFichierComponent,
    PasswordFichierDeleteComponent,
    HeaderFileManagerComponent,
    DossierListMinComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileManagerModule {}
