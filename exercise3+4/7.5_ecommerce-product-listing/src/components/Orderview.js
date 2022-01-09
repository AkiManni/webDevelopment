import React from 'react'

import styles from './Orderview.module.css'

export default function Orderview(props){

     
    let orderview = (
       
        <div className={styles.orderDetailsContainer} >   

        { props.purchases.filter(order => order.id === props.orderId).map((order, index) => 
            <div key={index}>
                <u><b>Order { order.id }.</b></u>  <br/>
                
                <b>Shop id:</b> <br/>{ order.shopId } <br/>
                <b>Shop name:</b> <br/>WEBSHOP<br/>
                <b>Customer id:</b><br/>
                { order.customerId }<br/>
                <b>Customer Name:</b><br/>
                { order.customerName }<br/>
                <b>Address:</b> <br/>
                { order.address }, {order.postNumber}<br/>
                <br/>
                <b>Order Placed:</b> <br/><text className={styles.orderTime}>{ order.orderPlacedAt }</text><br/>
                <br/>
                <b>Products Ordered:</b>
                {order.productsOrdered.map((product, i) => 
                <dl key={i}><dt> <b className={styles.orderTime}>{product.quantity}</b> x {product.name} <b>-</b> {product.price} €</dt></dl>
                )}
                <br/>
                <b>Total Payment:</b> <b className={styles.orderStatusOnGoing}>{ order.totalCost } </b><b>€</b>          
            </div>
        )}
        </div>
    );
    

    return (
        <div>
            {orderview}
        </div>
    );
}