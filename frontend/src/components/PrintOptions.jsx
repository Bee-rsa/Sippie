import { useState, useEffect } from 'react';
import JobSummary from './JobSummary';

const PrintOptions = ({ product }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  if (!product) {
    return <div>No product data available.</div>;
  }

  const { labels = {}, printPrice = {}, brandingPrice = {}, signsPrice = {}, ...otherOptions } = product;

  const capitalizeFirstLetter = (string) => {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log('printPrice:', printPrice);
    console.log('brandingPrice:', brandingPrice);
    console.log('signsPrice:', signsPrice);

    let totalPrice = printPrice?.productPrice || brandingPrice?.productPrice || signsPrice?.productPrice || 0;

    Object.entries(selectedOptions).forEach(([optionName, optionValue]) => {
      console.log('Checking option:', optionName, optionValue);
      
      if (printPrice?.[`${optionName}Prices`] && printPrice[`${optionName}Prices`][optionValue]) {
        console.log(`Adding price from printPrice:`, printPrice[`${optionName}Prices`][optionValue]);
        totalPrice += printPrice[`${optionName}Prices`][optionValue];
      }
      
      if (brandingPrice?.[`${optionName}Prices`] && brandingPrice[`${optionName}Prices`][optionValue]) {
        console.log(`Adding price from brandingPrice:`, brandingPrice[`${optionName}Prices`][optionValue]);
        totalPrice += brandingPrice[`${optionName}Prices`][optionValue];
      }

      if (signsPrice?.[`${optionName}Prices`] && signsPrice[`${optionName}Prices`][optionValue]) {
        console.log(`Adding price from signsPrice:`, signsPrice[`${optionName}Prices`][optionValue]);
        totalPrice += signsPrice[`${optionName}Prices`][optionValue];
      }
    });

    setCalculatedPrice(totalPrice);
  }, [selectedOptions, product, printPrice, brandingPrice, signsPrice]);

  return (
    <div className="print-options p-4 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2 p-4 border-2 border-gray-300 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl text-green-500 font-bold mb-4">Printing Options</h2>
        <h2 className="text-lg md:text-xl mb-4">Please fill out the information below</h2>

        <div className="product-options grid grid-cols-2 gap-4">
          {Object.entries(otherOptions).map(([optionKey, optionValues]) => {
            const label = labels?.[optionKey] || optionKey;

            return (
              Array.isArray(optionValues) && optionValues.length > 0 && (
                <div
                  key={optionKey}
                  className={`col-span-${optionValues.length % 2 === 1 && optionValues.length > 2 ? '2' : '1'}`}
                >
                  <h3 className="text-base mb-2">{capitalizeFirstLetter(label.replace(/([A-Z])/g, ' $1'))}</h3>
                  <select
                    value={selectedOptions[optionKey] || ''}
                    onChange={(e) => handleOptionChange(optionKey, e.target.value)}
                    className="w-full p-2 border rounded-lg text-black bg-green-600 appearance-none"
                  >
                    <option value="">Choose an option</option>
                    {optionValues.map((value, index) => (
                      <option key={index} value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              )
            );
          })}
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <JobSummary calculatedPrice={calculatedPrice} />
      </div>
    </div>
  );
};

export default PrintOptions;