import React from 'react';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';


const HistoryBar = ({ orders }) => {
    return (
      <div>
        <IconButton >
            <HistoryIcon sx={{ fontSize: 40 }} />
        </IconButton>
        {orders.length > 0 && (
          <div>
            {orders.map((order) => (
              <div key={order.id}>
                <a href={`/order/${order.id}`}>Order {order.id}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default HistoryBar;
