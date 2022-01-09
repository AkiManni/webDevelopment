import React from 'react';
import styles from './SearchView.module.css';

import SearchResult from './SearchResult';

export default function SearchView(props) {

  const addToOrder = (id,shopId,manufucturer,type,name,price) => {
    props.addToOrder(id,shopId,manufucturer,type,name,price)
  }

  return (
    <div>
      <div className={ styles.presentationModeGrid }>
      {
        props.items.map(item => <SearchResult key={item.id} {...item} addToOrder={addToOrder} />)
      }
      </div>
    </div>
  )
}
