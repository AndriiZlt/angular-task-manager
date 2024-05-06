import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlpacaService } from 'src/app/services/alpaca.service';

@Component({
  selector: 'app-alpaca-trading',
  templateUrl: './alpaca-trading.component.html',
  styleUrls: ['./alpaca-trading.component.scss'],
})
export class AlpacaTradingComponent implements OnInit {
  constructor(private http: HttpClient, private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    this.alpacaService.getAccount().subscribe((acc) => {
      console.log('acc', acc);
    });
  }
}
