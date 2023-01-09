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
          top: '50px',
          width: '500px',
          height: '400px',
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
                <h3>Group - {style}
                <button onClick={() => removeStyleFromOrder(style)}>Remove group from order</button>
                </h3>
                <ul>
                  {groupedOrder[style].map((item, index) => (
                    item.quantity > 0 ? (
                      <li key={index}>
                        {item.name} - {item.quantity}

                          <button onClick={() => addBeerToOrder(item.name, 1, item.style)}>+</button>
                          <button onClick={() => removeBeerFromOrder(item.name)}>-</button>
                      </li>
                    ) : null
                  ))}
                </ul>
              </div>
            ))}
            <div>Total items: {currentOrder.reduce((acc, item) => acc + item.quantity, 0)}
            <button>Save Order</button>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
};

export default CurrentOrder;
