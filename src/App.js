import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerList from './BeerList'; 
import CurrentOrder from './CurrentOrder';
import SearchField from './SearchField';

function App() {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [beers, setBeers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get('https://random-data-api.com/api/beer/random_beer?size=20')
      .then((response) => {
        setBeers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToOrder = (name, quantity) => {
    const index = currentOrder.findIndex((item) => item.name === name);
    if (index === -1) {
      setCurrentOrder([...currentOrder, { name, quantity }]);
    } else {
      const updatedOrder = [...currentOrder];
      updatedOrder[index] = { name, quantity: updatedOrder[index].quantity + quantity };
      setCurrentOrder(updatedOrder);
    }
  };

  const removeFromOrder = (name) => {
    const index = currentOrder.findIndex((item) => item.name === name);
    if (index !== -1) {
      const updatedOrder = [...currentOrder];
      updatedOrder.splice(index, 1);
      setCurrentOrder(updatedOrder);
    }
  };

  const refreshBeers = () => {
    fetch('https://random-data-api.com/api/beer/random_beer?size=20')
      .then((response) => response.json())
      .then((data) => setBeers(data));
      console.log("Updated list");
      console.log(beers);
  };

  

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Welcome to beer ordering app</h1>
      <SearchField beers={beers} addToOrder={addToOrder} refreshBeers={refreshBeers}/>
      {/* <BeerList refresh={refresh} setRefresh={setRefresh} /> */}
      
      <CurrentOrder currentOrder={currentOrder} addToOrder={addToOrder} removeFromOrder={removeFromOrder}/> {/* Pass the addToOrder function to the BeerList component */}
      
     
    </div>
  );
}

export default App;
