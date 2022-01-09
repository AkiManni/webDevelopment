import React from 'react';
import styles from './SearchResult.module.css';

export default function SearchResult(props) {

  const addToOrder = (id,shopId,manufucturer,type,name,price) => {
    props.addToOrder(id,shopId,manufucturer,type,name,price)
  }

  return (
    <div className={ styles.product }>
        <div>
          <div><img className={styles.productImage} src={props.image} /></div>
          <div className={ styles.name }>{ props.name }</div>
          <div>{ props.manufucturer }</div>
          <div>{ props.type }</div>
          <i>{props.description }</i>
          <div>${ props.price }</div>
          <div><button onClick={() => addToOrder(props.id,props.shopId,props.manufucturer,props.type,props.name,props.price)}>Lisää ostoskoriin</button></div>
        </div>
    </div>
  )
}
