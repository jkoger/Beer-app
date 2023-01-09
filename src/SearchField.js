import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import _ from 'lodash';

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
          <button onClick={refreshBeers}> Refresh beer selection </button> 
          {isOpen ? (
            <div>
              {Object.keys(groupedBeers).map((style) => (
                <div key={style}>
                  <h3>{style}</h3>
                  <button onClick={() => addStyleToOrder(style, 0)}> Add group to order </button>
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
                      <button onClick={() => addBeerToOrder(item.name, 1, item.style)}> Add beer to order </button>
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
