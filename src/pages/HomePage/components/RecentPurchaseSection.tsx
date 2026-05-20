import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { useGetApiQuery } from '@/utils/hooks/useApiQuery';
import { getRecentPurchaseProducts } from '@/utils/http';
import RecentProductCard from './RecentProductCard';

function RecentPurchaseSection() {
  const { data: recentProducts, isFetching, isError, error } = useGetApiQuery(getRecentPurchaseProducts);

  const productLength = recentProducts?.recentProducts.length ?? 0;

  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        {(() => {
          switch (true) {
            case isFetching:
              return (
                <>
                  <Spacing size={4} />
                  <Text variant="H1_Bold">조회중입니다...</Text>
                </>
              );
            case isError:
              return (
                <>
                  <Spacing size={4} />
                  <Text variant="H1_Bold">에러가 발생했습니다.</Text>
                  <Text variant="B2_Regular">{error?.message}</Text>
                </>
              );
            case productLength > 0:
              return recentProducts?.recentProducts.map(product => <RecentProductCard key={product.id} {...product} />);
            default:
              return (
                <>
                  <Spacing size={4} />
                  <Text variant="H1_Bold">최근 구매한 상품이 없습니다.</Text>
                </>
              );
          }
        })()}
      </Flex>
    </styled.section>
  );
}

export default RecentPurchaseSection;
