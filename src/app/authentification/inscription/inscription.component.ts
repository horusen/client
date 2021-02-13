import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BaseCreateComponent } from 'src/app/shared/components/base-component/base-create.component';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent extends BaseCreateComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router, public baseService: BaseService) {
    super(baseService)
  }

  ngOnInit(): void {
  }


  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      password_confirmation: [null, [Validators.required]],
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      date_naissance: [null, [Validators.required]],
      sexe: [null, Validators.required],
      photo: [null, Validators.required]
    });


    this.form.controls.sexe.valueChanges.subscribe(sexe => {
      if (sexe !== 'homme' && sexe !== 'femme') {
        this.formValuePatcher('sexe', 'homme');
        this.helper.alertDanger('');
      }
    })
  }

  onFileChanged(event) {
    let image = event.target.files[0];
    this._ngxPicaService
      .resizeImage(image, 91, 91)
      .subscribe(imageRetailler => {
        this.partenaireFormData.append("image", imageRetailler);
      });
  }

  inscription() {
    this.loading = true;
    this.authService.incsription(this.form.value).subscribe(() => {
      this.loading = false;
      this.router.navigate(['school', 'explore']);
    })
  }

}
