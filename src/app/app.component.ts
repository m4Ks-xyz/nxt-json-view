import { Component } from '@angular/core';
import { JsonViewModule } from '../lib/json-view.module';

@Component({
  selector: 'app-root',
  imports: [JsonViewModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nxt-json-view';
}
  
