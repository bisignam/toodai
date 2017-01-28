import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service';

@Component({
		moduleId: module.id,
		selector: 'hero-search',
		templateUrl: './hero-search.component.html',
		styleUrls: ['./hero-search.component.css'],
		providers: [ HeroSearchService ]
})

export class HeroSearchComponent implements OnInit {
		heroes: Observable<Hero[]>;
		private searchTerms = new Subject<string>(); //from documentation  An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.
		constructor(
				private heroSearchService: HeroSearchService, //server per la ricerca
				private router: Router //serve per spostarci sul dettaglio
		){}
		ngOnInit(){
				this.heroes = this.searchTerms
						.debounceTime(300) //aspetta 300ms dopo ogni keystroke
						.distinctUntilChanged() //se il termine non è cambiato rispetto al precedente non fare niente (previene richieste inutili)
						.switchMap(term => { //ogni volta che il termine cambia switcha ad un nuovo observable (switchMap prende solo l'ultimo valore emesso dai searchTerms)
								if(term){
										return this.heroSearchService.search(term);
								}else{
										return Observable.of<Hero[]>([]);
								}
						})
						.catch(error => {
								console.log(error);
								return Observable.of<Hero[]>([]); 
						});
		}
		search(term: string): void {
				this.searchTerms.next(term); //Here the searchTerms Subject acts as an observable by delivering new value with next
		}
		gotoDetail(id: number): void {
				this.router.navigate(['/detail', id]);
		}
}

