import { Component, OnInit } from '@angular/core';
import { Link } from '../link/link';
import { LinkService } from '../link/link.service';

@Component ({
		moduleId: module.id,
		selector: 'my-home',
		styleUrls: [ './home.component.css' ],
		templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
		links: Link[];
		constructor(private linkService: LinkService) { };
		ngOnInit(): void {
				this.getLinks();
		};
		getLinks(): void {
				this.linkService.getLinks().then(links => this.links = links.slice(1, 5));
		};
}
