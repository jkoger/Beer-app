import React from 'react';
import _ from 'lodash';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';


const CurrentOrder = ({ beers, currentOrder, addBeerToOrder, removeStyleFromOrder, removeBeerFromOrder, saveOrder }) => {


  const groupedOrder = _.groupBy(currentOrder, 'style');
  const groupedBeers = _.groupBy(beers, 'style');

  const sortedBeers = Object.keys(groupedBeers).map(style => {
    const sortedGroup = _.sortBy(groupedBeers[style], 'alcohol');
    return {
      style,
      beers: sortedGroup
    };
  });

  const handleAddButtonClick = (style) => {
    const selectedGroup = sortedBeers.find(group => group.style === style);
    if (!selectedGroup) {
      console.log("This group is not available anymore.")
      return;
    }

    for (let i = 0; i < selectedGroup.beers.length; i++) {
      const beer = selectedGroup.beers[i];
      if (!currentOrder.find(item => item.name === beer.name)) {
        addBeerToOrder(beer.name, 1, beer.style, beer.alcohol);
        break;
      }
    }
  };

  const handleRemoveButtonClick = (style) => {
    const selectedGroup = currentOrder.filter(item => item.style === style);
    if (!selectedGroup.length) {
      return;
    }
    const sortedBeers = _.sortBy(selectedGroup, 'alcohol').reverse();
    for (let i = 0; i < sortedBeers.length; i++) {
      const beer = sortedBeers[i];
      if (beer.quantity > 0) {
        removeBeerFromOrder(beer.name, beer.style, beer.alcohol);
        break;
      }
    }
  };

  return (
    <div>
      <div style={{
        position: 'absolute',
        left: 800,
        top: '50px',
        margin: '20px'
      }}
      >
        <h2>Current order</h2>
        {currentOrder.length === 0 ? (
          <p>Your order is empty.</p>
        ) : (
          <>
            {Object.keys(groupedOrder).map((style) => (
              <div key={style}>
                <h3><u>Group - {style}</u>
                  <IconButton onClick={() => handleAddButtonClick(style)}>
                    <AddCircleIcon />
                  </IconButton>

                  <IconButton onClick={() => handleRemoveButtonClick(style)}>
                    <RemoveCircleIcon />
                  </IconButton>

                  <IconButton onClick={() => removeStyleFromOrder(style)}>
                    <DeleteIcon />
                  </IconButton>
                </h3>
                <ul>
                  <TableContainer>
                    <Table>

                      <TableBody>
                        {groupedOrder[style].map((item, index) => (
                          item.quantity > 0 ? (
                            <TableRow key={index}>
                              <TableCell> {item.name} - {item.alcohol} vol</TableCell>
                              <TableCell align="right"> {item.quantity}</TableCell>
                              <TableCell align="right">
                                <IconButton onClick={() => addBeerToOrder(item.name, 1, item.style, item.alcohol)}>
                                  <AddIcon />
                                </IconButton>
                                <IconButton onClick={() => removeBeerFromOrder(item.name, item.style, item.alcohol)}>
                                  <RemoveIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ) : null
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                </ul>
              </div>
            ))}
            <div>
              <p style={{ textAlign: 'right' }}>Total items: {currentOrder.reduce((acc, item) => acc + item.quantity, 0)}</p>

              <Button variant="contained" onClick={() => saveOrder()} disabled={currentOrder.reduce((acc, item) => acc + item.quantity, 0) === 0}>Save Order</Button>

            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default CurrentOrder;
