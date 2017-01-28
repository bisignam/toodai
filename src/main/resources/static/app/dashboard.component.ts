import { Component, OnInit } from '@angular/core';
import { Hero } from './hero'
import { HeroService } from './hero.service';

@Component ({
		moduleId: module.id,
		selector: 'my-dashboard',
		styleUrls: [ './dashboard.component.css' ],
		templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
		constructor(private heroService: HeroService) { };
		ngOnInit(): void {
				this.getHeroes();
		}
		heroes: Hero[];
		getHeroes(): void {
				this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
		}
}
