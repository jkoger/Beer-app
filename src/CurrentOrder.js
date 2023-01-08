import React from 'react';

const CurrentOrder = ({ currentOrder, addToOrder, removeFromOrder }) => {
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
          border: '1px solid black',
          padding: '20px',
        }}
      >
        <h2>Current order</h2>
        {currentOrder.length === 0 ? (
          <p>Your order is empty.</p>
        ) : (
          <>
            
            <ul>
              {currentOrder.map((item) => (
                <li key={item.name}>
                  {item.name}
                  <button onClick={() => removeFromOrder(item.name)}>Remove group from order</button>
                  <button onClick={() => removeFromOrder(item.name)}>+</button>
                  <button onClick={() => removeFromOrder(item.name)}>-</button>
                </li>
              ))}
            </ul>
            
        <p>Total items: {currentOrder.reduce((total, item) => total + item.quantity, 0)}</p> 
          </>
        )}
        
      </div>
      
    </div>
  );
};

export default CurrentOrder;
