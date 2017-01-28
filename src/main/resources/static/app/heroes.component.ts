import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero'
import { HeroService } from './hero.service';


@Component({
		moduleId: module.id,
		selector: 'my-heroes',
		templateUrl: './heroes.component.html',
		styleUrls: [ './heroes.component.css' ]
})

export class HeroesComponent implements OnInit {
		ngOnInit(): void {
				this.getHeroes();
		}
    constructor(
				private heroService: HeroService,
				private router: Router,
		){}; //auto inject service from the given providers
    heroes: Hero[];
		selectedHero: Hero;
		onSelect(hero: Hero): void {
				this.selectedHero = hero;
		};
    getHeroes(): void {
				this.heroService.getHeroes().then( heroes => this.heroes = heroes);
    };
		gotoDetail(): void {
				this.router.navigate(['/detail/', this.selectedHero.id]);
		};
		add(heroName: string): void {
				this.heroService.create(heroName).then(hero => {
						this.heroes.push(hero);
						this.selectedHero = null;
				});
		}
		delete(hero: Hero): void {
				this.heroService.delete(hero.id).then(() => {
						this.heroes = this.heroes.filter(h => h !== hero); //remove the deleted hero from the display
						if( this.selectedHero === hero ){ this.selectedHero = null;} // if the removed hero is the selected one the deselect it
				});
		}
}
