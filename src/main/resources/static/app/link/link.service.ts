import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';  
import { AuthHttp } from 'angular2-jwt';
import { Link } from './link';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LinkService {
		private linkUrls = 'api/links';
		private headers = new Headers({'Content-Type': 'application/json'});
		constructor(private http: AuthHttp){}
		handleError(error: any): Promise<any> {
				console.error('An error occurred', error);
				return Promise.reject(error.message || error);
		}
		getLinks(): Promise<Link[]> {
				return this.http.get(this.linkUrls).toPromise()
						.then(response => response.json().data as Link[])
						.catch(this.handleError);
		}
		getLink(id: number): Promise<Link> {
				return this.getLinks()
						.then(links => links.find(link => link.id === id));
		}
		update(link: Link): Promise<Link> {
				const url = `${this.linkUrls}/${link.id}`; //apici bash like :D
				return this.http.put(url, JSON.stringify(link), {headers : this.headers})
						.toPromise()
						.then(() => link)
						.catch(this.handleError);
		}
		create(title: string, url: string): Promise<Link> {
				return this.http.post(this.linkUrls, JSON.stringify({name: name, url: url}), {headers: this.headers})
						.toPromise()
						.then(res => res.json().data)
						.catch(this.handleError);
		}
		delete(id: number): Promise<void> {
				const url = `${this.linkUrls}/${id}`;
				return this.http.delete(url, {headers: this.headers})
						.toPromise()
						.then(() => null)
						.catch(this.handleError);
		}
}
