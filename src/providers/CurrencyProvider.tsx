import { useGetApiQuery } from '@/utils/hooks/useApiQuery';
import { getCurrencyRate } from '@/utils/http';
import type { Currency, CurrencyRate } from '@/utils/types/currency';
import { createContext, useCallback, useState } from 'react';

export const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  CPrice: (price: number) => string;
}>({
  currency: 'USD',
  setCurrency: () => {},
  CPrice: () => '',
});

const generatePrice = (currency: Currency = 'USD', price: number, currencyRate: CurrencyRate) => {
  if (price == null) {
    return '가격을 불러오지 못했습니다.';
  }

  if (currency === 'KRW') {
    return `${Math.ceil(price * currencyRate.exchangeRate[currency]).toLocaleString()}원`;
  }

  return `$${price.toLocaleString()}`;
};

const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const { data: currencyRate } = useGetApiQuery(getCurrencyRate);

  const generatePriceCallBack = useCallback(
    (price: number) => {
      return generatePrice(currency, price, currencyRate);
    },
    [currency, currencyRate]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, CPrice: generatePriceCallBack }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
