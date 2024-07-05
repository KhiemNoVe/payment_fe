import { useState } from 'react';
import { Layout, Row, Col, Input, Button } from 'antd';
import BraintreeDropIn from '../components/Braintree/BraintreeDropIn';

import Loading from '../components/Loading';
import useGetToken from '../hooks/useGetToken';

const { Content } = Layout;

const PRICE = 10;

const Home = () => {
  const { data, isFetching } = useGetToken();

  const [numberOfProducts, setNumberOfProducts] = useState(1);
  const [step, setStep] = useState<number>(1);

  if (isFetching) return <Loading />;
  if (step === 2)
    return (
      <BraintreeDropIn
        amount={numberOfProducts * PRICE}
        token={data.token}
        onPaymentCompleted={() => {
          setStep(1);
          setNumberOfProducts(1);
        }}
      />
    );
  return (
    <Layout className="p-5 text-center">
      <Content>
        <Row gutter={16} className=" flex justify-center mb-5">
          <Col span={4}>Product</Col>
          <Col span={2} className="text-center">
            Price
          </Col>
          <Col span={2} className="text-center">
            Quantity
          </Col>
          <Col span={2} className="text-center">
            Total
          </Col>
          <Col span={2} />
        </Row>
        <Row gutter={16} className=" flex justify-center">
          <Col span={4} className="productInfoColumn">
            Foo product
          </Col>
          <Col span={2} className="productInfoColumnCenter">
            ${PRICE}
          </Col>
          <Col span={2} className="productInfoColumnCenter">
            <Input
              placeholder="0"
              min={1}
              max={100}
              type="number"
              value={numberOfProducts}
              onChange={(e) => {
                setNumberOfProducts(e.target.valueAsNumber);
              }}
            />
          </Col>
          <Col span={2} className="productInfoColumnCenter">
            ${numberOfProducts * PRICE}
          </Col>
          <Col span={2} className="productInfoColumnCenter">
            <Button
              onClick={() => {
                setStep(2);
              }}
              disabled={step === 2}
            >
              Go to Checkout
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
