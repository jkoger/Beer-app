import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerList from './BeerList'; 
import CurrentOrder from './CurrentOrder';
import SearchField from './SearchField';
import { useLocalStorage } from './localStorage';
import HistoryBar from './historyBar';

function App() {
  const [orders, setOrders] = useLocalStorage('orders', []);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [beers, setBeers] = useState([]);
  const [refresh, setRefresh] = useState();
  const [orderNumber, setOrderNumber] = useState(1);

  useEffect(() => {
    refreshBeers();
  }, [refresh]);

  useEffect(() => {
    const orderCount = localStorage.getItem("orderNumber");
    if (orderCount !== null) {
        setOrderNumber(parseInt(orderCount));
    }
  }, []);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders'));
    if (storedOrders) {
      setOrders(storedOrders);
    }
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
        style: updatedOrder[index].style,
        quantity: updatedOrder[index].quantity - 1,
      };
      if (updatedOrder[index].quantity === 0) {
        updatedOrder.splice(index, 1);
      }
      setCurrentOrder(updatedOrder);
    }
  };


  const refreshBeers = () => {
    axios.get('https://random-data-api.com/api/beer/random_beer?size=20')
      .then((response) => {
        setBeers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveOrder = () => {
    const timestamp = new Date().toLocaleString(); // timestamp of when the order was created
    // create an object that represents the order
    const newOrder = {
        id: orderNumber,
        timestamp: timestamp,
        items: currentOrder
    };
    // use setOrders to save the new order
    setOrders([...orders, newOrder]);
    console.log("Saved order: ", newOrder);
    localStorage.setItem('orderNumber', orderNumber + 1)
    setOrderNumber(prev => prev + 1)
}

  

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Welcome to beer ordering app</h1>
      <SearchField beers={beers} addStyleToOrder={addStyleToOrder} addBeerToOrder ={addBeerToOrder} refreshBeers={refreshBeers}/>
      <HistoryBar orders={orders}/>

      {/* <BeerList refresh={refresh} setRefresh={setRefresh} /> */}
      <CurrentOrder currentOrder={currentOrder} addStyleToOrder={addStyleToOrder} addBeerToOrder={addBeerToOrder} removeStyleFromOrder={removeStyleFromOrder} removeBeerFromOrder={removeBeerFromOrder} saveOrder={saveOrder}/>
      
     
    </div>
  );
}

export default App;
