import { Component } from '@angular/core';

//This is a so called 'Router Component':
// - it is attached to a router and displays routed views since we are using the router-outlet directive

@Component({
		moduleId: module.id,
		selector: 'my-app',
		templateUrl: './app.component.html',
		styleUrls: [ './app.component.css' ]
})

export class AppComponent {
 title = 'Tour of Heroes';
}
