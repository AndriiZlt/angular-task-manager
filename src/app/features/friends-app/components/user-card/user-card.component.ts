import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { OnlineUser } from '../../models/OnlineUser.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnInit {
  constructor() {}

  @Input() user: OnlineUser;
  @Input() userIndex: number;
  @Output() addFriend: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}
}
