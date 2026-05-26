import { SubGNB, Text } from '@/ui-lib';
import { useMemo, useState } from 'react';
import { Box, Grid, styled } from 'styled-system/jsx';
import { useGetApiQuery } from '@/utils/hooks/useApiQuery';
import { getMainProductList } from '@/utils/http';
import MainProductCard from './MainProductCard';
import type { ProductCategory } from '@/utils/types/product';

function ProductListSection() {
  const [currentTab, setCurrentTab] = useState<ProductCategory | 'all'>('all');

  const { data: mainProducts } = useGetApiQuery(getMainProductList);

  const filteredProducts = useMemo(() => {
    if (currentTab === 'all') {
      return mainProducts?.products ?? [];
    }

    return mainProducts?.products.filter(product => product.category.toUpperCase() === currentTab.toUpperCase()) ?? [];
  }, [currentTab, mainProducts]);

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root value={currentTab} onValueChange={({ value }) => setCurrentTab(value as ProductCategory | 'all')}>
        <SubGNB.List>
          <SubGNB.Trigger value="all">전체</SubGNB.Trigger>
          <SubGNB.Trigger value="cheese">치즈</SubGNB.Trigger>
          <SubGNB.Trigger value="cracker">크래커</SubGNB.Trigger>
          <SubGNB.Trigger value="tea">티</SubGNB.Trigger>
        </SubGNB.List>
      </SubGNB.Root>
      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
        {filteredProducts.map(product => {
          return <MainProductCard key={product.id} {...product} />;
        })}
      </Grid>
    </styled.section>
  );
}

export default ProductListSection;
