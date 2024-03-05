import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '../friends-view.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnInit {
  constructor() {}

  @Input() user: User;
  @Input() userIndex: number;
  @Output() addFriend: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}
}
