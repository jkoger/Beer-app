import React, { useState } from 'react';
import Downshift from 'downshift';
import _ from 'lodash';

const SearchField = ({ beers, addToOrder, refreshBeers, removeFromOrder  }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState(beers);

  const handleInputChange = (event) => {
    if (!beers) {
        return;
    }
    setInputValue(event.target.value);
    setFilteredItems(
      beers.filter((item) =>
        item.brand.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

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
                  <button onClick={() => addToOrder(style, 0)}> Add group to order </button>
                  {groupedBeers[style].map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        style: {
                          //backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {item.brand} - {item.name}
                      <button onClick={() => addToOrder(style, 0)}> Add beer to order </button>
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
