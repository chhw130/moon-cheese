import ProductItem from '../components/ProductItem';
import { CurrencyContext } from '@/providers/CurrencyProvider';
import { Counter } from '@/ui-lib';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import type { Product, ProductCategory } from '@/utils/types/product';
import { useCartItem } from '@/utils/hooks/useCartItem';

type MainProductCardProps = Product;

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

const INITIAL_PRODUCT_STOCK = 0;

const MainProductCard = ({
  id,
  price,
  name,
  description,
  rating,
  images,
  category,
  stock,
  isCaffeineFree = false,
  isGlutenFree = false,
}: MainProductCardProps) => {
  const { CPrice } = useContext(CurrencyContext);

  const navigate = useNavigate();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const productType = getProductType(category, { isCaffeineFree, isGlutenFree });

  const { addCartItem, removeCartItem, cartItems } = useCartItem();

  const onClickMinusButton = () => {
    removeCartItem(String(id));
  };

  const onClickPlustButton = () => {
    addCartItem(String(id), 1);
  };

  const cartSize = cartItems.get(String(id)) ?? 0;

  const isDisabledPlustButton = cartSize >= stock;
  const isDisabledMinusButton = cartSize <= INITIAL_PRODUCT_STOCK;

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
        <Counter.Minus onClick={onClickMinusButton} disabled={isDisabledMinusButton} />
        <Counter.Display value={cartSize} />
        <Counter.Plus onClick={onClickPlustButton} disabled={isDisabledPlustButton} />
      </Counter.Root>
    </ProductItem.Root>
  );
};

export default MainProductCard;
