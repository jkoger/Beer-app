import React, { useState, useEffect, setRefresh, } from 'react';
import BeerColumn from './BeerColumn'; 

const BeerList = ({ refresh, setRefresh, addToOrder }) => {
  const [beers, setBeers] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(''); 

  useEffect(() => {
    fetch('https://random-data-api.com/api/beer/random_beer?size=20')
      .then((response) => response.json())
      .then((data) => setBeers(data));
  }, [refresh]);

  
  const beerGroups = beers.reduce((groups, beer) => {
    if (!groups[beer.style]) {
      groups[beer.style] = [];
    }
    groups[beer.style].push(beer);
    return groups;
  }, {});

  
  const styles = Object.keys(beerGroups);

  return (
    
    <div style={{ margin: '20px' }}>
      
      <label htmlFor="style-select">Select a beer type:</label>
      <select
        id="style-select"
        value={selectedStyle}
        onChange={(event) => setSelectedStyle(event.target.value)}
      >
        <option value="">-- All styles --</option>
        {styles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>

      
      {selectedStyle ? (
        <BeerColumn style={selectedStyle} beers={beerGroups[selectedStyle]} addToOrder={addToOrder} />
      ) : (
        styles.map((style) => (
            <BeerColumn key={style} style={style} beers={beerGroups[style]} addToOrder={addToOrder} />
        ))
      )}
    </div>
  );
};

export default BeerList;
