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

  const addStyleToOrder = (style, quantity) => {
    const index = currentOrder.findIndex((item) => item.style === style);
    if (index === -1) {
      setCurrentOrder([...currentOrder, { style: style, quantity: 0 }]);
    } else {
      const updatedOrder = [...currentOrder];
      updatedOrder[index] = { style: style, quantity: updatedOrder[index].quantity + 0 };
      setCurrentOrder(updatedOrder);
      console.log(updatedOrder);
    }
  };

  const addBeerToOrder = (name, quantity, style) => {
    const index = currentOrder.findIndex((item) => item.name === name);
    if (index === -1) {
      setCurrentOrder([...currentOrder, { name: name, style: style, quantity: 1 }]);
    } else {
      const updatedOrder = [...currentOrder];
      updatedOrder[index] = { name: name, style: style, quantity: updatedOrder[index].quantity + 1 };
      setCurrentOrder(updatedOrder);
      console.log(updatedOrder);
    }
  };

  
  
  

  const removeStyleFromOrder = (style) => {
    setCurrentOrder(currentOrder.filter((item) => item.style !== style));
  };

  const removeBeerFromOrder = (name) => {
    const index = currentOrder.findIndex((item) => item.name === name);
    if (index !== -1) {
      const updatedOrder = [...currentOrder];
      updatedOrder[index] = {
        name: updatedOrder[index].name,
        quantity: updatedOrder[index].quantity - 1,
      };
      if (updatedOrder[index].quantity === 0) {
        updatedOrder.splice(index, 1);
      }
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
      <SearchField beers={beers} addStyleToOrder={addStyleToOrder} addBeerToOrder ={addBeerToOrder} refreshBeers={refreshBeers}/>
      {/* <BeerList refresh={refresh} setRefresh={setRefresh} /> */}
      <CurrentOrder currentOrder={currentOrder} addStyleToOrder={addStyleToOrder} addBeerToOrder={addBeerToOrder} removeStyleFromOrder={removeStyleFromOrder} removeBeerFromOrder={removeBeerFromOrder}/>
      
     
    </div>
  );
}

export default App;
