import { useMediaQuery } from '@react-hook/media-query';

import classes from './CollectionsContainer.module.scss';
import { useFiltersContext } from '../../contexts/filters_context';

import { ProductsCard, SortProducts, Filters } from '../../components';

const CollectionsContainer = () => {
  const { filtered_products: products } = useFiltersContext();

  const matchesMedia = useMediaQuery('only screen and (max-width: 768px)');

  return (
    <div className='container'>
      <div className={classes.collections__grid}>
        {!matchesMedia ? (
          <>
            <div>
              <Filters />
            </div>

            <div className={classes.collections__products}>
              <div className={classes.sorts}>
                <SortProducts />
              </div>
              <div className={classes.products}>
                {products?.map(product => (
                  <ProductsCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={classes.collections__filters}>
              <div>
                <Filters />
              </div>
              <div className={classes.sorts}>
                <SortProducts />
              </div>
            </div>

            <div className={classes.products}>
              {products?.map(product => (
                <ProductsCard product={product} key={product.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionsContainer;
