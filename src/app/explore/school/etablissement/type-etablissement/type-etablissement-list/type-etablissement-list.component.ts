import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component/base.component';
import { EtablissementService } from '../../etablissement.service';

@Component({
  selector: 'app-type-etablissement-list',
  templateUrl: './type-etablissement-list.component.html',
  styleUrls: ['./type-etablissement-list.component.scss']
})
export class TypeEtablissementListComponent extends BaseComponent implements OnInit {

  constructor(public typeEtablissementService: EtablissementService) {
    super(typeEtablissementService);
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.typeEtablissementService.get().subscribe((data) => {
      this.data = data.map((type: any) => type.id)
      this.loading = false;
    });
  }

}
