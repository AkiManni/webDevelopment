import React from 'react'

import styles from './InvoiceHistory.module.css'

export default function Dialog(props) {

    const overviewChange = (value) => {
        props.overviewChange(value)
    }


    let dialog = (
        <div><div className={styles.productsToBeOrderedText}>TILAUKSET</div>
          { props.purchases.filter(order => parseInt(order.customerId) === parseInt(props.activeUser.id) ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
            <button onClick={() => overviewChange(item.id)}>View Order</button> <br/>
            <br/><b>Order: {item.id}. </b> <br/>
            {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
            </div>)}
        </div>


    );

    return (
        <div>
            {dialog}
        </div>
    );

}