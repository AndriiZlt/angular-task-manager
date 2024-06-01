export interface Asset {
  exchange: string;
  symbol: string;
  id: string;
  name: string;
  status: string;
  tradable: boolean;
  class: string;
  easy_To_Borrow: boolean;
  fractionable: boolean;
  maintenance_Margin_Requirement: number;
  marginable: boolean;
  shortable: boolean;
}
