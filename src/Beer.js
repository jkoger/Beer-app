import React from 'react';


const Beer = ({ beer, addToOrder }) => {
  return (
    <div>
      <h3 style={{ textDecoration: 'underline' }}>{beer.name}</h3>
    </div>
  );
};

export default Beer;