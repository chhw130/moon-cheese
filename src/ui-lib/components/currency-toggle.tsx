import { Switch as ArkSwitch, switchAnatomy } from '@ark-ui/react';
import { css, cx, type RecipeVariantProps, sva } from 'styled-system/css';
import { useGetApiQuery } from '@/utils/hooks/useApiQuery';
import { getCurrencyRate } from '@/utils/http';

export type CurrencyToggleVariantProps = RecipeVariantProps<typeof currencyToggleRecipe>;

export const currencyToggleRecipe = sva({
  slots: [...switchAnatomy.keys(), 'symbolLeft', 'symbolRight'],
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      pos: 'relative',
    },
    control: {
      w: '66px',
      h: '36px',
      p: '3px',
      alignItems: 'center',
      bg: 'background.03_gray',
      rounded: 'lg',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: '0',
      transitionDuration: 'normal',
      transitionProperty: 'background',
      transitionTimingFunction: 'default',
      pos: 'relative',
    },
    thumb: {
      w: '30px',
      h: '30px',
      bg: 'background.01_white',
      rounded: 'lg',
      shadow: 'xs',
      transitionDuration: 'normal',
      transitionProperty: 'transform, background',
      transitionTimingFunction: 'default',
      _checked: {
        transform: 'translateX(100%)',
        bg: 'background.01_white',
      },
    },
    symbolLeft: {
      pos: 'absolute',
      left: 0,
      top: 0,
      w: '36px',
      h: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textStyle: 'B1_Bold',
      transitionDuration: 'normal',
      transitionProperty: 'color, opacity',
      transitionTimingFunction: 'default',
      zIndex: 10,
      pointerEvents: 'none',
    },
    symbolRight: {
      pos: 'absolute',
      right: 0,
      top: 0,
      w: '36px',
      h: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textStyle: 'B1_Bold',
      transitionDuration: 'normal',
      transitionProperty: 'color, opacity',
      transitionTimingFunction: 'default',
      zIndex: 10,
      pointerEvents: 'none',
    },
  },
});

export type CurrencyType = 'USD' | 'KRW';

export type CurrencyToggleProps = CurrencyToggleVariantProps & {
  value?: CurrencyType;
  defaultValue?: CurrencyType;
  onValueChange?: (value: CurrencyType) => void;
  disabled?: boolean;
};

// `현재 환율`을 서버에서 불러와주세요.
// 1. 대한민국 `원`, 미국 `달러` **2종류의 통화**를 사용해요.
// 2. 네트워크 요청은 `/utils/http.ts` 를 활용해 아래 API 문서를 기준으로 요청을 보내주세요.
// `사용할 통화`를 선택하는 기능을 추가해주세요.
// 1. 선택한 통화는 `서비스 전체`에 적용되어야 해요.
// 2. 통화를 변경하면 현재 환율에 맞게 상품가격이 변경되어야 해요.
// 3. 금액은 자릿수에 맞게 콤마(,)를 추가해주세요.
const CurrencyToggle = ({ value, defaultValue = 'USD', onValueChange, disabled = false }: CurrencyToggleProps) => {
  const handleChange = (details: { checked: boolean }) => {
    onValueChange?.(details.checked ? 'KRW' : 'USD');
  };

  const { data: currencyRate } = useGetApiQuery(getCurrencyRate);

  const isCheckedKRW = value ? value === 'KRW' : defaultValue === 'KRW';

  const classes = currencyToggleRecipe();

  return (
    <ArkSwitch.Root
      checked={isCheckedKRW}
      onCheckedChange={handleChange}
      disabled={disabled}
      className={classes.root}
      data-testid="currency-toggle"
    >
      <ArkSwitch.Control className={classes.control}>
        <span
          className={cx(
            classes.symbolLeft,
            css({
              color: isCheckedKRW ? 'neutral.04_gray' : 'neutral.01_black',
            })
          )}
        >
          $
        </span>
        <ArkSwitch.Thumb className={classes.thumb} />
        <span
          className={cx(
            classes.symbolRight,
            css({
              color: isCheckedKRW ? 'neutral.01_black' : 'neutral.04_gray',
            })
          )}
        >
          원
        </span>
      </ArkSwitch.Control>
      <ArkSwitch.HiddenInput />
    </ArkSwitch.Root>
  );
};

CurrencyToggle.displayName = 'CurrencyToggle';

export default CurrencyToggle;
