import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import _ from 'lodash';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';


const SearchField = ({ beers, addStyleToOrder, addBeerToOrder, refreshBeers }) => {
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
            {({ getInputProps, getItemProps, isOpen }) => (
                <div style={{
                    top: '50px',
                    margin: '20px'
                }}>
                    <h2>Start typing to find available beers</h2>
                    <div>

                        <TextField style={{ paddingRight: '20px' }} size="small" type="search" {...getInputProps({ onChange: handleInputChange })} value={inputValue} />
                        <Button variant="contained" onClick={refreshBeers}> Refresh beer selection </Button>
                    </div>
                    {isOpen && (
                        <List component="div" sx={{ width: '100%', maxWidth: 680 }}>
                            {Object.keys(groupedBeers).map((style) => (
                                <div key={style}>
                                    <Typography style={{ paddingRight: '20px' }} sx={{ fontWeight: 'bold' }} variant="h7" gutterBottom>
                                        {style}
                                    </Typography>

                                    <Button variant="text" size="medium" onClick={() => addStyleToOrder(style, 0)}> Add group to order </Button>

                                    {groupedBeers[style].map((item, index) => (
                                        <ListItem
                                            {...getItemProps({
                                                key: item.id,
                                                index,
                                                item
                                            })}
                                        >
                                            <ListItemText primary={`${item.brand} - ${item.name} - ${item.alcohol}`} />
                                            <Button variant="contained" size="small" onClick={() => addBeerToOrder(item.name, 1, item.style, item.alcohol)}> Add beer to order </Button>
                                        </ListItem>
                                    ))}
                                </div>
                            ))}
                        </List>
                    )}

                </div>
            )}
        </Downshift>
    );
};

export default SearchField;
