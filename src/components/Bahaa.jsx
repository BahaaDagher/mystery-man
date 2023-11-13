import React from 'react';

const Bahaa = () => {
  const numbersArray = [1, 2, 3, 4, 5];

  const handleButtonClick = (number) => {
    console.log(number);
  };

  return (
    <div>
      {numbersArray.map((number) => (
        <button key={number} onClick={() => handleButtonClick(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Bahaa;
