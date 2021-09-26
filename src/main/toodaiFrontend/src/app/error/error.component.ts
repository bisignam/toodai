import { Component, Input } from '@angular/core';

@Component({
	selector: 'tod-error',
	templateUrl: './error.component.html',
})

export class ErrorComponent {
	@Input()
	public error: string;
};
