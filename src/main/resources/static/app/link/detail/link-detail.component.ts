import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Link } from '../link';
import { LinkService } from '../link.service';

@Component({
	selector: 'my-link-detail',
	moduleId: module.id,
	styleUrls: ['./link-detail.component.css'],
	templateUrl: './link-detail.component.html'
})

export class LinkDetailComponent implements OnInit {
	link: Link;
	constructor(
		private linkService: LinkService,
		private route: ActivatedRoute,
		private location: Location
	) { };
	ngOnInit(): void {
		this.route.params.switchMap((params: Params) => this.linkService.getLink(+params['id'])) // + operator convert string to number
			.subscribe(link => this.link = link);
	};
	goBack(): void {
		this.location.back();
	};
	save(): void {
		this.linkService.update(this.link).then(() => this.goBack());
	};
}
