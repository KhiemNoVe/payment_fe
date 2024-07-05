import { useEffect, useState } from 'react';
import dropin from 'braintree-web-drop-in';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import useProcessPayment from '../../hooks/useProcessPayment';

function BraintreeDropIn(props: any) {
  const { mutate, isLoading, isError, isSuccess } = useProcessPayment();
  const { amount, token, onPaymentCompleted } = props;

  const [braintreeInstance, setBraintreeInstance] = useState<any>(undefined);

  useEffect(() => {
    const initializeBraintree = () =>
      dropin.create(
        {
          authorization: token,
          container: '#braintree-drop-in-div',
          paypal: {
            flow: 'vault',
          },
        },
        function (error, instance) {
          if (error) console.error(error);
          else setBraintreeInstance(instance);
        }
      );

    if (braintreeInstance) {
      braintreeInstance.teardown().then(() => {
        initializeBraintree();
      });
    } else {
      initializeBraintree();
    }
  }, [token]);
  const handlePayment = (nonce: string) => {
    mutate({ amount, nonce });
    onPaymentCompleted();
  };

  return (
    <div className=" h-screen flex flex-col justify-center">
      <div className="max-w-[50rem] mx-auto flex flex-col gap-5 justify-start items-start">
        <h2>
          <span className="font-medium">Card Number:</span> 378282246310005
        </h2>
        <h2>
          <span className="font-medium">Expiration Date:</span> 06 26
        </h2>
        <Link
          to="https://developer.paypal.com/braintree/docs/reference/general/testing/node"
          target="_blank"
          className="font-medium text-blue-600"
        >
          More :v
        </Link>
      </div>

      <div className="max-w-[50rem] mx-auto">
        <div id={'braintree-drop-in-div'} />

        <Button
          className="w-full"
          type="primary"
          disabled={!braintreeInstance}
          onClick={() => {
            if (braintreeInstance) {
              braintreeInstance.requestPaymentMethod(
                (error: any, payload: any) => {
                  console.log('🚀 ~ BraintreeDropIn ~ payload:', payload);
                  if (error) {
                    console.error(error);
                  } else {
                    handlePayment(payload.nonce);
                  }
                }
              );
            }
          }}
        >
          {'Pay'}
        </Button>
      </div>
    </div>
  );
}

export default BraintreeDropIn;
