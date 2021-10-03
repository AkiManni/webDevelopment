import React from 'react';
import SearchView from './components/SearchView';
import data from './data.json'
import users from './users.json'
import purchases from './purchases.json'
import AdminView from './components/AdminView';
import './App.css';
import RegisterDialog from './components/RegisterDialog';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      items: data.items,
      users: users.users,
      purchases: purchases.purchases,
      productSearchString: "",
      adminModeActive: false,
      regDialog:false,
      buyButtons:false,
      username: "",
      password: "",
    }
  }

  
  checkValid = () => {
    if(this.state.users.filter((user) => 
      (user.username.includes(this.state.username)&&
      (user.type.includes(this.state.password)) && ( 
        this.state.users.filter(user => user.username === this.state.username).map(({ id })=>(
          id  == this.state.users.filter(user => user.password === this.state.password).map(({ id })=>(
            id )
      ))))))){
        this.setState({ buyButtons: !this.state.buyButtons});
      }
  }

  onSearchFieldChange = (event) => {

    console.log('Keyboard event');
    console.log(event.target.value);
    this.setState({ productSearchString: event.target.value });
  }

  onUserFieldChange = (event) => {
    this.setState({ username: event.target.value })
  }

  onPasswordFieldChange = (event) => {
    this.setState({ password: event.target.value });
  }

  addNewItem = (name, manufucturer, price, qty) => {
    let newItems = [...this.state.items];
    newItems.push({
      id: newItems.length + 1,
      name: name,
      manufucturer: manufucturer,
      price: price,
      qty: qty
    });

    this.setState({
      items: newItems
    });
  }

  addNewUser = (firstname,surname,adress,username,password) => {
    let newUsers = [...this.state.users];
    newUsers.push({
      id: newUsers.length + 1,
      firstname: firstname,
      surname: surname,
      adress: adress,
      username: username,
      password: password
    });

    this.setState({
      users: newUsers
    });
  }

  updateItem = (id, name, manufucturer, price, qty) => {
    let newItems = [...this.state.items];
      newItems[id-1].name = name;
      newItems[id-1].manufucturer = manufucturer;
      newItems[id-1].price = price;
      newItems[id-1].qty = qty;
    

    this.setState({
      items:newItems
    });
  }



  deleteItem = itemId => this.setState({items: this.state.items.filter(item => item.id !== itemId)})

  render()
  {

    let output =
      <>
          <div className="menuBar"> Search: <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.productSearchString }/> 
          <button className="button1" onClick={ () => this.setState({regDialog: !this.state.regDialog }) }>Rekisteröidy</button> 
          Käyttäjätunnus: <input className="validationEntry" type="text" onChange={ this.onUserFieldChange } value={ this.state.username } />
          Salasana: <input className="validationEntry" type="text" onChange={ this.onPasswordFieldChange } value={ this.state.password } />
          <button className="button2" onClick={ this.checkValid }>Kirjaudu</button>
          <button onClick={() => this.setState({adminModeActive: !this.state.adminModeActive})}>Admin mode</button>
          </div>
        <SearchView
          items={ this.state.items.filter((item) => 
            (item.manufucturer.includes(this.state.productSearchString)||
            (item.type.includes(this.state.productSearchString))||
            (item.name.includes(this.state.productSearchString)))) }
          />
        
      </>

    if(this.state.regDialog){
      output = <RegisterDialog
      disableRegister={() => this.setState({regDialog: false})}
      addNewUser={ this.addNewUser }
      users ={ this.state.users }/>;
    }


    if(this.state.adminModeActive) {
      output = <AdminView
                  disableAdminMode={() => this.setState({adminModeActive: false}) }
                  addNewItem={ this.addNewItem }
                  updateItem={ this.updateItem }
                  items={ this.state.items }
                  users={ this.state.users }
                  purchases={ this.state.purchases }
                  deleteItem={ this.deleteItem }
               />;
    }



    return (
      <>
        { output }
      </>
    )
  }
}

export default App;