import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from './link'
import { LinkService } from './link.service';


@Component({
		moduleId: module.id,
		selector: 'my-link',
		templateUrl: './links.component.html',
		styleUrls: [ './links.component.css' ]
})

export class LinksComponent implements OnInit {
		ngOnInit(): void {
				this.getLinks();
		}
    constructor(
				private linkService: LinkService,
				private router: Router,
		){}; //auto inject service from the given providers
    links: Link[];
		selectedLink: Link;
		onSelect(link: Link): void {
				this.selectedLink = link;
		};
    getLinks(): void {
				this.linkService.getLinks().then(links => this.links = links);
    };
		gotoDetail(): void {
				this.router.navigate(['/detail/', this.selectedLink.id]);
		};
		add(linkTitle: string, linkUrl: string): void {
				this.linkService.create(linkTitle, linkUrl).then(link => {
						this.links.push(link);
						this.selectedLink = null;
				});
		}
		delete(link: Link): void {
				this.linkService.delete(link.id).then(() => {
						this.links = this.links.filter(h => h !== link); //remove the deleted link from the display
						if( this.selectedLink === link ){ this.selectedLink = null;} // if the removed link is the selected one the deselect it
				});
		}
}
