import { NgxPicaService } from '@digitalascetic/ngx-pica';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BaseCreateComponent } from 'src/app/shared/components/base-component/base-create.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { AbstractBaseService } from 'src/app/shared/services/abstract-base.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent extends BaseCreateComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  constructor(public fb: FormBuilder, public authService: AuthService,
    public router: Router, public service: AbstractBaseService, public ngxPicaService: NgxPicaService) {
    super(service)
  }

  ngOnInit(): void {

    this.initForm();
  }


  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      password_confirmation: [null, [Validators.required]],
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      date_naissance: [null, [Validators.required]],
      sexe: ['homme', Validators.required],
    });

    this.formData = new FormData();

    this.form.controls.sexe.valueChanges.subscribe(sexe => {
      if (sexe !== 'homme' && sexe !== 'femme') {
        this.formValuePatcher('sexe', 'homme');
        this.helper.alertDanger('');
      }
    })
  }

  onFileChanged(event) {
    let image = event.target.files[0];
    this.formData.append('photo', image);
    this.ngxPicaService
      .resizeImage(image, 35, 35)
      .subscribe((imageRetailler) => {
        this.formData.append("photo_min", new File([imageRetailler], imageRetailler.name, { type: imageRetailler.type }));
      });
  }

  fromReactiveformToFormData() {
    Object.keys(this.form.value).forEach(key => {
      this.formData.append(key, this.formValue(key));
    })
  }

  inscription() {
    if (this.form.valid) {
      this.loading = true;
      this.fromReactiveformToFormData()
      this.authService.incsription(this.formData).subscribe(() => {
        this.initForm()
        this.loading = false;
        this.router.navigate(['school', 'explore']);
      })
    }


  }

}
