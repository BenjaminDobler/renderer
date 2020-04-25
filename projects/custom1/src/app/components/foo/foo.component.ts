import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class FooComponent implements OnInit {

  @Input()
  public set myInput(value) {

  }

  data: {
    test: "hallo"
  }
  constructor() { }

  ngOnInit(): void {
  }

  hallo(val) {
    console.log(val);
  }

}
