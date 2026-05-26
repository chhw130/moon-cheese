import ProductItem from '../components/ProductItem';
import { CurrencyContext } from '@/providers/CurrencyProvider';
import { Counter } from '@/ui-lib';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import type { Product, ProductCategory } from '@/utils/types/product';

type MainProductCard = Product;

const getProductType = (
  category: ProductCategory,
  { isCaffeineFree, isGlutenFree }: { isCaffeineFree: boolean; isGlutenFree: boolean }
) => {
  if (category === 'CRACKER' && isGlutenFree) {
    return 'gluten';
  }

  if (category === 'TEA' && isCaffeineFree) {
    return 'caffeine';
  }
};

const MainProductCard = ({
  price,
  name,
  description,
  rating,
  images,
  category,
  isCaffeineFree = false,
  isGlutenFree = false,
}: MainProductCard) => {
  const { CPrice } = useContext(CurrencyContext);

  const navigate = useNavigate();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const productType = getProductType(category, { isCaffeineFree, isGlutenFree });

  return (
    <ProductItem.Root onClick={() => handleClickProduct(1)}>
      <ProductItem.Image src={images[0]} alt={name} />
      <ProductItem.Info title={name} description={description} />
      <ProductItem.Meta>
        <ProductItem.MetaLeft>
          <ProductItem.Rating rating={rating} />
          <ProductItem.Price>{CPrice(price)}</ProductItem.Price>
        </ProductItem.MetaLeft>
        {productType && <ProductItem.FreeTag type={productType} />}
      </ProductItem.Meta>
      <Counter.Root>
        <Counter.Minus onClick={() => {}} disabled={true} />
        <Counter.Display value={3} />
        <Counter.Plus onClick={() => {}} />
      </Counter.Root>
    </ProductItem.Root>
  );
};

export default MainProductCard;
