import { useEffect } from 'react';
import { ShopMenPageContainer } from '../../containers';
import { useFiltersContext } from '../../contexts/filters_context';
import { useProductsContext } from '../../contexts/products_context';

const ShopMenPage = () => {
  const { men_products: products } = useProductsContext();
  const { getProductsByGender } = useFiltersContext();

  useEffect(() => {
    getProductsByGender(products);
  }, []);

  return <ShopMenPageContainer />;
};

export default ShopMenPage;
