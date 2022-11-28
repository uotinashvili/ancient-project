import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxItemComponent {
  @Input() box!: any;
}
