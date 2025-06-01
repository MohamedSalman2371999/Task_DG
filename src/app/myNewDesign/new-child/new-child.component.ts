import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-child',
  standalone: true,
  imports: [],
  templateUrl: './new-child.component.html',
  styleUrl: './new-child.component.scss'
})
export class NewChildComponent {
  @Input() data: any;

}
