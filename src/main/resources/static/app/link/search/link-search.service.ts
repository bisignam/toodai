import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Link } from '../link';

@Injectable()
export class LinkSearchService {
		constructor(private http: AuthHttp){}
		search(term: string): Observable<Link[]> {
				return this.http
						.get(`api/links?title=${term}`)
						.map(response => response.json().data as Link[]);
		}
}
