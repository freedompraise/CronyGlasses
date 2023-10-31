import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const FAQ = () => {
  const [productRelatedOpen, setProductRelatedOpen] = useState(false);
  const [purchaseRelatedOpen, setPurchaseRelatedOpen] = useState(false);

  const toggleProductRelated = () => {
    setProductRelatedOpen(!productRelatedOpen);
  };

  const togglePurchaseRelated = () => {
    setPurchaseRelatedOpen(!purchaseRelatedOpen);
  };

  return (
    <div className="mt-16">
      <div className="justify-center">
        <div>
          <h2 className="text-center text-lg font-bold uppercase mb-4">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl text-xl text-gray-500 ">
            Check out our frequently asked questions for more information about
            our products and services.
          </p>
        </div>

        <div className="mt-8">
          <div className="mx-auto justify-center">
            <h3
              onClick={toggleProductRelated}
              className="text-lg font-medium cursor-pointer flex justify-between items-center"
            >
              Product Related
              <FontAwesomeIcon icon={productRelatedOpen ? faMinus : faPlus} />
            </h3>
            {productRelatedOpen && (
              <dl className="space-y-10 mt-4">
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    What's the best way to get started?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    The best way to get started is to sign up for our free
                    trial. You'll get access to all of our features and can
                    start building your first project right away.
                  </dd>
                </div>
                {/* Other Product Related questions here */}
              </dl>
            )}
          </div>

          <div>
            <h3
              onClick={togglePurchaseRelated}
              className="text-lg font-medium cursor-pointer flex justify-between items-center mt-8"
            >
              Purchase Related
              <FontAwesomeIcon icon={purchaseRelatedOpen ? faMinus : faPlus} />
            </h3>
            {purchaseRelatedOpen && (
              <dl className="space-y-10 mt-4">
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Do you offer any discounts?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Yes! We offer discounts for non-profit organizations and
                    educational institutions. Contact us for more information.
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
