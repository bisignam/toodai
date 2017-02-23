import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'error',
	templateUrl: './error.component.html',
})

export class ErrorComponent {
	@Input()
	public error: string;
};
