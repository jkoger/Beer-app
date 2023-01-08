import React from 'react';
import Beer from './Beer';

const BeerColumn = ({ style, beers, addToOrder }) => {
    return (
      <div>
        <h2>
          {style}
          <button onClick={() => addToOrder(style, 0)}> Add group to order </button>
        </h2>
        {beers.map((beer) => (
          <Beer key={beer.id} beer={beer} addToOrder={addToOrder} />
        ))}
      </div>
    );
  };
  
  export default BeerColumn;