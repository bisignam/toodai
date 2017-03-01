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

import { Bookmark } from '../bookmark';
import { BookmarkSearchService } from './bookmark-search.service';

@Component({
		selector: 'tod-bookmark-search',
		templateUrl: './bookmark-search.component.html',
		styleUrls: ['./bookmark-search.component.css'],
		providers: [ BookmarkSearchService ]
})

export class BookmarkSearchComponent implements OnInit {
		links: Observable<Bookmark[]>;
		private searchTerms = new Subject<string>(); // from documentation  An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.
		constructor(
				private bookmarkSearchService: BookmarkSearchService, // server per la ricerca
				private router: Router // serve per spostarci sul dettaglio
		) {}
		ngOnInit() {
				this.links = this.searchTerms
						.debounceTime(300) // aspetta 300ms dopo ogni keystroke
						.distinctUntilChanged() // se il termine non è cambiato rispetto al precedente non fare niente (previene richieste inutili)
						.switchMap(term => { // ogni volta che il termine cambia switcha ad un nuovo observable (switchMap prende solo l'ultimo valore emesso dai searchTerms)
								if (term) {
										return this.bookmarkSearchService.search(term);
								} else {
										return Observable.of<Bookmark[]>([]);
								}
						})
						.catch(error => {
								console.log(error);
								return Observable.of<Bookmark[]>([]);
						});
		}
		search(term: string): void {
				this.searchTerms.next(term); // Here the searchTerms Subject acts as an observable by delivering new value with next
		}
		gotoDetail(id: number): void {
				this.router.navigate(['/detail', id]);
		}
}

