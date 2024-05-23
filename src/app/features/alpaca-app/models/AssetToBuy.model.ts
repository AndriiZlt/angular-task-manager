export interface Order {
  symbol: string;
  qty: string;
  side: 'buy';
  type: 'limit';
  limit_price: string;
  time_in_force: 'gtc';
}
