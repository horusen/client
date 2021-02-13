import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';



@NgModule({
  declarations: [LoginComponent, ConnexionComponent, InscriptionComponent],
  imports: [
    CommonModule, SharedModule
  ]
})
export class AuthentificationModule { }
