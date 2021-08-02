import dynamic from 'next/dynamic';
import { Layout } from '../../components';

const SuccessCheckoutPageContainer = dynamic(() =>
  import(
    '../../containers/SuccessCheckoutPageContainer/SuccessCheckoutPageContainer'
  )
);

const SuccessCheckoutPage = () => {
  return (
    <Layout title='Checkout Success | BYLT Premium'>
      <SuccessCheckoutPageContainer />
    </Layout>
  );
};

export default SuccessCheckoutPage;
