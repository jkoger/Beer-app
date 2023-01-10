import React from 'react';
import _ from 'lodash';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const CurrentOrder = ({ currentOrder, addBeerToOrder, removeStyleFromOrder, removeBeerFromOrder, saveOrder }) => {
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

                
                <IconButton >
                  <AddCircleIcon />
                </IconButton>
                
                <IconButton >
                  <RemoveCircleIcon />
                </IconButton>

                <IconButton onClick={() => removeStyleFromOrder(style)}>
                  <DeleteIcon />
                </IconButton>
                </h3>
                <ul>
                  {groupedOrder[style].map((item, index) => (
                    item.quantity > 0 ? (
                      <li key={index}>
                         {item.name} - {item.quantity}
                         <IconButton onClick={() => addBeerToOrder(item.name, 1, item.style)}>
                          <AddIcon />
                         </IconButton>

                         <IconButton onClick={() => removeBeerFromOrder(item.name, item.style)}>
                          <RemoveIcon />
                         </IconButton>
                      </li>
                    ) : null
                  ))}
                </ul>
              </div>
            ))}
            <div>Total items: {currentOrder.reduce((acc, item) => acc + item.quantity, 0)}
            <Button variant="contained" onClick={() => saveOrder()}>Save Order</Button>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
};

export default CurrentOrder;
