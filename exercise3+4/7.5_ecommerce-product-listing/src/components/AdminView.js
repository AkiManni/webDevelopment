import React, { useState } from 'react'
import styles from './AdminView.module.css'


export default function AdminView(props) {

  const [newId, setNewId] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemManufucturer, setNewItemManufucturer] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemQuantity, setNewItemQty] = useState("");

  const addNewItem = () => {
    props.addNewItem(newItemName, newItemManufucturer, newItemPrice, newItemQuantity);
  }

  const updateItem = () => {
    props.updateItem(newId, newItemName, newItemManufucturer, newItemPrice, newItemQuantity);
  }

  const onDeleteItemClick = (itemId) => {
    console.log("clicked delete for item id " + itemId);
    props.deleteItem(itemId);
  }

  return (
    <div className={ styles.divContainer }>
      <div>
          <h1>Add new item</h1>
          <div>
            id, jos haluat päivittää tietoja: <input type="text" onChange={ (event) => setNewId(event.target.value)} />
          </div>
          <div>
            Name <input type="text" onChange={ (event) => setNewItemName(event.target.value) } />
          </div>
          <div>
            Manufucturer <input type="text" onChange={ (event) => setNewItemManufucturer(event.target.value) } />
          </div>
          <div>
            Price <input type="text" onChange={ (event) => setNewItemPrice(event.target.value) } />
          </div>
          <div>
            Quantity <input type="text" onChange={ (event) => setNewItemQty(event.target.value) } />
          </div>
          <button onClick={ addNewItem }>Add Item</button><button onClick={ updateItem }>Päivitä</button>

        </div>
        <button onClick={ props.disableAdminMode }>Disable Admin Mode</button>
        
        <h1>List of items, users and orders:</h1>
        <div className={ styles.centerContent }>
          <tr><td></td><td>id:</td><td>Name</td><td>Manufucturer</td><td>Price</td><td>qty</td>
          </tr>
        { props.items.map((item, index) =>
          <tr key={index} >
            <td><button onClick={() => onDeleteItemClick(item.id)}>X</button></td><td>{item.id}</td><td>{item.name}</td> <td>{item.manufucturer}</td> <td>{item.price}</td> <td>{item.qty}</td>
          </tr>)}
        </div>

        <div className={ styles.centerContent2 }>
          <tr><td>id:</td><td>Firstname</td><td>Surname</td><td>Adress</td><td>Username</td><td>Password</td></tr>  
            
          { props.users.map((user,index) => 
            <tr key={index} >
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.surname}</td>
              <td>{user.adress}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
            </tr>)}
        </div>

        <div className={ styles.centerContent3 }>

          <tr><td>id:</td><td>Buyier</td><td>manufucturer</td><td>name</td><td>price</td><td>qty</td></tr>
          { props.purchases.map((purchase,index) =>
          <tr key={index} >
            <td>{purchase.id}</td>
            <td>{purchase.buyer}</td>
            <td>{purchase.manufucturer}</td>
            <td>{purchase.name}</td>
            <td>{purchase.price}</td>
            <td>{purchase.qty}</td>

          </tr>)}
        </div>
        
        
         
    </div>
  )
}
