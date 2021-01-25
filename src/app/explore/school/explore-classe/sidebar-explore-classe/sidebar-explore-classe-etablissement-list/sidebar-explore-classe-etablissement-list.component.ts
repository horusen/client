import { EtablissementService } from './../../../etablissement/etablissement.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component/base.component';

@Component({
  selector: 'app-sidebar-explore-classe-etablissement-list',
  templateUrl: './sidebar-explore-classe-etablissement-list.component.html',
  styleUrls: ['./sidebar-explore-classe-etablissement-list.component.scss']
})
export class SidebarExploreClasseEtablissementListComponent extends BaseComponent implements OnInit {

  constructor(public etablissementService: EtablissementService) {
    super(etablissementService);
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.etablissementService.initialise().subscribe((data) => {
      console.log(data.length)
      this.data = data;
      this.loading = false;
    })
  }

}
