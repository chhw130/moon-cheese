export type Currency = 'USD' | 'KRW';

export type CurrencyRate = {
  exchangeRate: {
    KRW: number;
    USD: number;
  };
};
