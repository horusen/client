import { EtablissementService } from './../../etablissement/etablissement.service';
import { Component, OnInit } from '@angular/core';
import { BaseSingleComponent } from 'src/app/shared/components/base-component/base-single.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-explore-classe-show',
  templateUrl: './explore-classe-show.component.html',
  styleUrls: ['./explore-classe-show.component.scss']
})
export class ExploreClasseShowComponent extends BaseSingleComponent implements OnInit {

  constructor(public etablissementService: EtablissementService, public route: ActivatedRoute) { 
    super(etablissementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

}
