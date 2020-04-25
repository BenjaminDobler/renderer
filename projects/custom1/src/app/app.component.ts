import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom1'

  showFoo=true;

  public onRemove() {

  }

  toggleFoo() {
    this.showFoo = !this.showFoo;
  }
  onDestroy() {
    console.log("Hallo");
  }

  onShow(val?) {
    console.log(val);
  }
}
