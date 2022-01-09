import React, { useState } from 'react'
import styles from './AdminView.module.css'


export default function AdminView(props) {

  const [newId, setNewId] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemManufucturer, setNewItemManufucturer] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newType, setNewType] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addNewItem = () => {
    props.addNewItem(newItemName, newItemManufucturer, newItemPrice, newImage, newType, newDescription);
  }

  const updateItem = () => {
    if(newId != "" || newItemName != "" || newItemManufucturer != "" || newDescription != "" || newImage != "" || newItemPrice != "" || newType != "")
    props.updateItem(newId, newItemName, newItemManufucturer, newImage, newType, newItemPrice);
  }

  const onDeleteItemClick = (itemId) => {
    console.log("clicked delete for item id " + itemId);
    props.deleteItem(itemId);
  }

  const deleteInvoice = (itemId) => {
    props.deleteInvoice(itemId);
  }

  return (
    <div className={ styles.divContainer }>
      <div>
          <h1>Add new item</h1>
          <div>
            Lisää id, jos haluat päivittää tuotteen tietoja: <input style={{width: 40}} type="text" onChange={ (event) => setNewId(event.target.value)} />
          </div>
          <div>
            Name <input type="text" onChange={ (event) => setNewItemName(event.target.value) } />
          </div>
          <div>
            Manufucturer <input type="text" onChange={ (event) => setNewItemManufucturer(event.target.value) } />
          </div>
          <div>
            Type <input type="text" onChange={ (event) => setNewType(event.target.value) } />
          </div>
          <div>
            Description <input type="text" onChange={ (event) => setNewDescription(event.target.value) } />
          </div>
          <div>
            Image <input type="text" onChange={ (event) => setNewImage(event.target.value) } />
          </div>

          <img style={{width: 200, height: 200, borderRadius: 200/ 2}}  src={newImage}  alt="<Preview>"/>
          <div>
            Price <input type="text" onChange={ (event) => setNewItemPrice(event.target.value) } />
          </div>
          <button onClick={ addNewItem }>Add Item</button><button onClick={ updateItem }>Päivitä</button>

        </div>
        <button onClick={ props.disableAdminMode }>Disable Admin Mode</button>
        
        <h1>List of items, users and orders:</h1>
        <div className={ styles.centerContent }>
          <tr><td></td><td>id:</td><td>Name</td><td>Manufucturer</td><td>Price</td>
          </tr>
        { props.items.map((item, index) =>
          <tr key={index} >
            <td><button onClick={() => onDeleteItemClick(item.id)}>X</button></td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.manufucturer}</td>
            <td>{item.price}</td>
          </tr>)}
        </div>

        <div className={ styles.centerContent2 }>
          <tr><td>id:</td><td>Firstname</td><td>Surname</td><td>Address</td><td>Postnumber</td><td>Username</td><td>Password</td></tr>  
            
          { props.users.map((user,index) => 
            <tr key={index} >
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.surname}</td>
              <td>{user.address}</td>
              <td>{user.postNumber}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
            </tr>)}
        </div>

        <div className={ styles.centerContent3 }>

          <tr><td></td><td>id:</td><td>Order Time:</td><td>customerId</td><td>Customer Name</td><td>Address</td><td>Postnumber</td><td>Total Payment</td></tr>
          { props.purchases.map((purchase,index) =>
          <tr key={index} >
            <td><button onClick={() => deleteInvoice(purchase.id)}>X</button></td>
            <td>{purchase.id}</td>
            <td>{purchase.orderPlacedAt}</td>
            <td>{purchase.customerId}</td>
            <td>{purchase.customerName}</td>
            <td>{purchase.address}</td>
            <td>{purchase.postNumber}</td>
            <td>{purchase.totalCost}€</td>
            {/* <td>{purchase.productsOrdered}</td> */}
          </tr>)}
        </div>
        
        
         
    </div>
  )
}
