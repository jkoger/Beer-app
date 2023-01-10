import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import _ from 'lodash';
import Button from '@mui/material/Button';

const SearchField = ({ beers, addStyleToOrder, addBeerToOrder, refreshBeers, removeFromOrder  }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState(beers);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  

  useEffect(() => {
    if (!beers) {
      return;
    }
    setFilteredItems(
      beers.filter((item) =>
        item.brand.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [beers, inputValue]);


  const groupedBeers = _.groupBy(filteredItems, 'style');

  return (
    <Downshift
      onChange={(selectedItem) => console.log(filteredItems)}
      itemToString={(item) => (item ? item.name : '')}
    >
      {({ getInputProps, getItemProps, isOpen, highlightedIndex, selectedItem }) => (
        <div style={{ margin: '20px' }}>
            <h2>Start typing to find available beers</h2>
          <input {...getInputProps({ onChange: handleInputChange })} value={inputValue} />
          <Button variant="contained" margin="5px" onClick={refreshBeers}> Refresh beer selection </Button> 
          {isOpen ? (
            <div>
              {Object.keys(groupedBeers).map((style) => (
                <div key={style}>
                  <h3>
                    {style}
                  <Button variant="contained" size="medium" onClick={() => addStyleToOrder(style, 0)}> Add group to order </Button>
                  </h3>
                  {groupedBeers[style].map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        style: {
                          //backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {item.brand} - {item.name} 
                      <Button variant="contained" size="small" onClick={() => addBeerToOrder(item.name, 1, item.style)}> Add beer to order </Button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};

export default SearchField;
