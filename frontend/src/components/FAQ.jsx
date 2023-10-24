import React from "react";

const FAQ = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center p-4 md:p-10">
      <div className="max-w-md mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-2xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Need more information?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Check out our frequently asked questions for more information about
            our products and services.
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-10">
            <div>
              <dt className="text-lg leading-6 font-medium text-gray-900">
                What's the best way to get started?
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                The best way to get started is to sign up for our free trial.
                You'll get access to all of our features and can start building
                your first project right away.
              </dd>
            </div>

            <div>
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Do you offer any discounts?
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Yes! We offer discounts for non-profit organizations and
                educational institutions. Contact us for more information.
              </dd>
            </div>

            <div>
              <dt className="text-lg leading-6 font-medium text-gray-900">
                What payment methods do you accept?
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                We accept all major credit cards, PayPal, and bank transfers.
              </dd>
            </div>

            <div>
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Can I cancel my subscription at any time?
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Yes! You can cancel your subscription at any time. Your account
                will remain active until the end of your billing cycle.
              </dd>
            </div>

            {/* More FAQs here */}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
