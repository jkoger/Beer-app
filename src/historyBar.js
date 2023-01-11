import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import _ from 'lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const HistoryBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const orders = JSON.parse(localStorage.getItem('orders'));
    const toggleHistory = () => {
        setIsOpen(!isOpen);
    };
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };
    const handleCloseDialog = () => {
        setSelectedOrder(null);
    };


    return (
        <div style={{ position: 'absolute', right: '20px' }}>
            {orders ? (
                <IconButton color="primary" onClick={toggleHistory} >
                    <HistoryIcon sx={{ fontSize: 40 }} />
                </IconButton>
            ) :

                <IconButton disabled >
                    <HistoryIcon sx={{ fontSize: 40 }} />
                </IconButton>
            }

            {isOpen && (
                <div>
                    {orders.map((order) => (
                        <div key={order.id}>
                            <Button onClick={() => handleOrderClick(order)}> Order {order.id} </Button>
                        </div>
                    ))}
                </div>
            )}
            
            <Dialog open={Boolean(selectedOrder)}>
                {selectedOrder && (
                    <div style={{ margin: '20px' }}>
                        <h3 style={{ position: 'relative' }}><u> Order {selectedOrder.id}:</u></h3>
                        <IconButton
                            onClick={handleCloseDialog}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}>
                            <CloseIcon />
                        </IconButton>
                        <div>
                            {Object.entries(_.groupBy(selectedOrder.items, 'style'))
                                .map(([style, items]) => {
                                    const filteredItems = items.filter(item => item.quantity > 0);
                                    return filteredItems.length > 0 ? (
                                        <div key={style}>
                                            <h4>{style}</h4>
                                            <ul>
                                                <TableContainer >
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Name</TableCell>
                                                                <TableCell align="right">%</TableCell>
                                                                <TableCell align="right">Qnt</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {filteredItems.map((item, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell> {item.name}</TableCell>
                                                                    <TableCell align="right">{item.alcohol}</TableCell>
                                                                    <TableCell align="right">{item.quantity}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </ul>
                                        </div>
                                    ) : null;
                                })}
                        </div>
                        <i>Saved on: {selectedOrder.timestamp}</i>
                        <p style={{ textAlign: 'right' }}>Total items: {selectedOrder.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default HistoryBar;

