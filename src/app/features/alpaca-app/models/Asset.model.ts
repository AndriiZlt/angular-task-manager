export interface Asset {
  exchange: string;
  symbol: string;
  id: string;
  name: string;
  status: string;
  tradable: boolean;
  class: string;
  easy_to_borrow: boolean;
  fractionable: boolean;
  maintenance_margin_requirement: number;
  marginable: boolean;
  shortable: boolean;
}
