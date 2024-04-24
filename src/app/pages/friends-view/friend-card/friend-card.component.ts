import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Friend } from 'src/app/models/Friend.model';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendCardComponent implements OnInit {
  constructor() {}

  @Input() friend: Friend;
  @Input() friendIndex: number;
  @Output() removeFriend: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}

  onRemove() {
    this.removeFriend.emit(this.friend.id);
  }
}
