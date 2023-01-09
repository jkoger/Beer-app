import React from 'react';
import _ from 'lodash';

const CurrentOrder = ({ currentOrder, addBeerToOrder, removeStyleFromOrder, removeBeerFromOrder }) => {
  const groupedOrder = _.groupBy(currentOrder, 'style');
  
  return (
    <div>
      <div
        style={{
          position: 'fixed',
          right: '20px',
          top: '20px',
          width: '300px',
          height: '400px',
          backgroundColor: 'white',
          padding: '20px',
        }}
      >
        <h2>Current order</h2>
        {currentOrder.length === 0 ? (
          <p>Your order is empty.</p>
        ) : (
          <>
            {Object.keys(groupedOrder).map((style) => (
              <div key={style}>
                <h3>Group - {style}</h3>
                <button onClick={() => removeStyleFromOrder(style)}>Remove group from order</button>
                {groupedOrder[style].map((item) => (
            <div key={item.id}>
              * {item.name} - {item.quantity}
              <button onClick={() => addBeerToOrder(item.name, 1, item.style)}> + </button>
              <button onClick={() => removeBeerFromOrder(item.name)}>-</button>
            </div>
          ))}
              </div>
            ))}
            <div>Total items: {currentOrder.reduce((acc, item) => acc + item.quantity, 0)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentOrder;
