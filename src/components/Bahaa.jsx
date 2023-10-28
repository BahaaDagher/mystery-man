import React from 'react';



const Bahaa = () => {
  return (
    <div style = {{display : "flex" ,overflowX : "auto" , width : "100%"}}>
      {Array(20).fill().map((_, index) => (
        <div key={index}  style = {{flex: "0 0 100px" ,  height : "100px" , backgroundColor : "lightblue", margin : "10px"}}>
          Child {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Bahaa;
