import { Flex, styled } from 'styled-system/jsx';
import { Text } from '@/ui-lib';
import { useContext } from 'react';
import { CurrencyContext } from '@/providers/CurrencyProvider';
import type { RecentPurchaseProduct } from '@/utils/types/product';

type RecentProductCard = RecentPurchaseProduct;

const RecentProductCard = ({ name, price, thumbnail }: RecentProductCard) => {
  const { CPrice } = useContext(CurrencyContext);

  return (
    <Flex
      css={{
        gap: 4,
      }}
    >
      <styled.img
        src={thumbnail}
        alt="item"
        css={{
          w: '60px',
          h: '60px',
          objectFit: 'cover',
          rounded: 'xl',
        }}
      />
      <Flex flexDir="column" gap={1}>
        <Text variant="B2_Medium">{name}</Text>
        <Text variant="H1_Bold">{CPrice(price)}</Text>
      </Flex>
    </Flex>
  );
};

export default RecentProductCard;
