export interface CalculateItem {
  [key: string]: {
    paymentTotal: number;
    tossList: {
      [key: string]: number;
    };
  };
}
export interface CalculateTossItem {
  [key: string]: number;
}
