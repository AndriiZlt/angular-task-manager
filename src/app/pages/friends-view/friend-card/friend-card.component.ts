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
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendCardComponent implements OnInit {
  constructor() {}

  @Input() friend: User;
  @Input() friendIndex: number;
  @Output() removeFriend: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}
}
