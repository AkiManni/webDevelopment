import React from 'react';
import SearchView from './components/SearchView';
import data from './data.json'
import users from './users.json'
import purchases from './purchases.json'
import AdminView from './components/AdminView';
import tempOrder from './tempOrder.json';
import './App.css';
import RegisterDialog from './components/RegisterDialog';
import SideBar from './components/SideBar';
import MenuBar from './components/MenuBar';
import InvoiceHistory from './components/InvoiceHistory';
import Orderview from './components/Orderview';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {                              
      items: data.items,
      users: users.users,
      tempOrder: tempOrder.order,
      orderPrices:[],
      ordersClear:[],
      activeUser:{ 
        id: "", 
        firstname:"",
        surname:"",
        address:"",
        postNumber:""       
        },
      auth: false,
      purchases: purchases.purchases,
      productSearchString: "",
      adminModeActive: false,
      regDialog:false,
      buyButtons:false,
      username: "",
      password: "",
      startup:0,
      refresh:0,
      defaultUserBarActive: true,
      customerBarActive: false,
      auth: false,
      orderHistoryActive: false,
      orderId:"",
    }
  }


  checkValid = (userName,password) => {

    if(this.state.users.filter((user) =>
    (user.username === userName && user.password === password))){
      let tempUsers = [...this.state.users]
      let tempIndex = tempUsers.findIndex((user) => (user.username === userName ))
      if(tempUsers[tempIndex] !== undefined){
        
        this.setState({
          activeUser:
          { 
          id: tempUsers[tempIndex].id, 
          firstname:tempUsers[tempIndex].firstname,
          surname:tempUsers[tempIndex].surname,
          address:tempUsers[tempIndex].address,
          postNumber:tempUsers[tempIndex].postNumber       
          },
          customerBarActive: true,
          defaultUserBarActive:false,
          auth: true,
      })
      localStorage.setItem("activeUser", JSON.stringify(this.state.activeUser))
      }
      else{
        alert("Wrong Credentials")
      }
      }
      
    // else{
    //   alert("Wrong Credentials!")
    // }
  }

  signOut = () => {
    this.setState({ customerBarActive:false,defaultUserBarActive:true, auth:false,orderHistoryActive:false,
    activeUser:[]})
    localStorage.setItem("activeUser", JSON.stringify(this.state.activeUser))
  }

  onSearchFieldChange = (event) => {

    console.log('Keyboard event');
    console.log(event.target.value);
    this.setState({ productSearchString: event.target.value });
  }
  

  addNewItem = (name, manufucturer, price, image, type, description) => {
    let newItems = [...this.state.items];
    newItems.push({
      id: newItems.length + 1,
      shopId: 0,
      name: name,
      manufucturer: manufucturer,
      type: type,
      description: description,
      price: parseInt(price),
      image: image
    });

    localStorage.setItem("items",JSON.stringify(newItems));

    this.setState({
      items: JSON.parse(localStorage.getItem("items"))
    });
  }

  addNewUser = (firstname,surname,address,postNumber,username,password) => {
    let newUsers = [...this.state.users];
    newUsers.push({
      id: newUsers.length + 1,
      firstname: firstname,
      surname: surname,
      address: address, 
      postNumber: postNumber,
      username: username,
      password: password
    });

    localStorage.setItem("users",JSON.stringify(newUsers));

    this.setState({
      users: JSON.parse(localStorage.getItem("users"))
    });
  }

  updateItem = (id, name, manufucturer, image, type, price) => {
    let newItems = [...this.state.items];
      newItems[id-1].name = name;
      newItems[id-1].manufucturer = manufucturer;
      newItems[id-1].image = image;
      newItems[id-1].type = type;
      newItems[id-1].price = parseInt(price);
    
    localStorage.setItem("items",JSON.stringify(newItems));

    this.setState({
      items: JSON.parse(localStorage.getItem("items"))
    });
  }

  deleteItem = itemId => {
    localStorage.setItem("items",JSON.stringify(this.state.items.filter(item => item.id !== itemId)))
    this.setState({items: JSON.parse(localStorage.getItem("items"))})
  }

  deleteInvoice = itemId => {
    localStorage.setItem("purchases",JSON.stringify(this.state.purchases.filter(item => item.id !== itemId)))
    this.setState({purchases: JSON.parse(localStorage.getItem("purchases"))})
  }

  addToOrder = (id,shopId,manufucturer,type,name,price) => {

    let newTemplateOfOrder = [...this.state.tempOrder]
    var actionDone = false
    let idcheck

    this.priceSaver(price);
    
    if(!newTemplateOfOrder.findIndex(index => index.id === id) && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.id === id)
        newTemplateOfOrder[idcheck].quantity += 1
        actionDone = true;
      }

    if(!newTemplateOfOrder.findIndex(index => index.id === id) === false && newTemplateOfOrder.findIndex(index => index.id === id) === -1 && actionDone === false)
      {
        newTemplateOfOrder.push({"id":id,"shopId":shopId,"manufucturer":manufucturer,"type":type,"name":name,"price":price, "quantity":1})
        actionDone = true; 
      }
    if(newTemplateOfOrder.findIndex(index => index.id === id) >=0 && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.id === id)
        newTemplateOfOrder[idcheck].quantity += 1
        actionDone = true;
      }

    this.setState({tempOrder:newTemplateOfOrder})
  }

  reduceFromOrder = (id, shopId) => {

    let newTemplateOfOrder = [...this.state.tempOrder]
    let newTemplatePrices = [...this.state.orderPrices]
    var actionDone = false
    let idcheck // muuttuja TemplateOrdersin indexille, josta vähennetään tuote - newTemplateOfOrder[idcheck].quantity -=
    let tempResId // muuttuja TemplateOrdersin indexille, josta tuote löytyy - newTemplateOfOrder.findIndex(index => index.id === id )

    let orderIdcheck = newTemplatePrices.findIndex(index => index.id === shopId)    // restaurant Id Pricelistiltä

    if(newTemplateOfOrder.findIndex(index => index.id === id) >=0 && actionDone === false)
      {
        idcheck = newTemplateOfOrder.findIndex(index => index.id === id && index.shopId === shopId)
        newTemplateOfOrder[idcheck].quantity -= 1
        tempResId = newTemplateOfOrder.findIndex(index => index.id === id )
        newTemplatePrices[orderIdcheck].price -= newTemplateOfOrder[tempResId].price;

        if(newTemplateOfOrder[idcheck].quantity === 0){
          newTemplateOfOrder.splice(idcheck,1)
        }
        actionDone = true;
      }

    this.setState({
      tempOrder:newTemplateOfOrder,
      orderPrices:newTemplatePrices
    })

  }

  priceSaver = (price) => { 
    let copyOfPrices = [...this.state.orderPrices]

    var actionDone = false
    let idcheck
    
    if(!copyOfPrices.findIndex(index => index.id === 0) && actionDone === false)
      {
        idcheck = copyOfPrices.findIndex(index => index.id === 0)
        copyOfPrices[idcheck].price += price
        actionDone = true;
      }

    if(!copyOfPrices.findIndex(index => index.id === 0) === false && copyOfPrices.findIndex(index => index.id === 0) === -1 && actionDone === false)
      {
        copyOfPrices.push({"id":0,"price":price})
        actionDone = true;
      }
    if(copyOfPrices.findIndex(index => index.id === 0) >=0 && actionDone === false)
      {
        idcheck = copyOfPrices.findIndex(index => index.id === 0)
        copyOfPrices[idcheck].price += price
        actionDone = true;
      }

    this.setState({orderPrices:copyOfPrices})
  }


  regDialogActivate = () => {
    this.setState({regDialog: !this.state.regDialog })
  }

  adminModeActivate = () => {
    this.setState({adminModeActive: !this.state.adminModeActive})
  }

  historyActivate = () => {
    this.setState({orderHistoryActive: !this.state.orderHistoryActive, customerBarActive: !this.state.customerBarActive, orderId:""})
  }

  overviewChange = id => { 
    this.setState({orderId: id})
  }

  makeOrder = (index, customerId,shopId,customerName,address,postnumber,totalCost, productsOrdered) => {
    
    let copyOfPurchases = [...this.state.purchases]
    
    var indexid = Math.max.apply(Math, copyOfPurchases.map(function(o) { return o.id; }))

    console.log(indexid)
    if(copyOfPurchases.length <= 0){
       indexid = 1;
     }
    else{
       indexid = index
    }

    copyOfPurchases.push({
      id: indexid,
      customerId: customerId,
      shopId: shopId,
      shopName:"WEBSHOP",
      customerName: customerName,
      address: address,
      postNumber: postnumber,
      totalCost: totalCost,
      orderPlacedAt:new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      productsOrdered: productsOrdered
    })

    localStorage.setItem("purchases",JSON.stringify(copyOfPurchases));

    this.setState({
      purchases: JSON.parse(localStorage.getItem("purchases"))
    });
  }

  clearOrderFromTempOrder = (rId) => {
    let newTemplateOfOrder = [...this.state.tempOrder]
    let secondTemplateOfOrder = []
    let newTemplateOfPrices = [...this.state.orderPrices]
    let secondTemplateOfPrices = []
    
    for(var i in newTemplateOfOrder){
      if(newTemplateOfOrder[i].shopId !== rId){
        secondTemplateOfOrder.push(newTemplateOfOrder[i])
      }
    }

    for(var idx in newTemplateOfPrices){
      if(newTemplateOfPrices[idx].id !== rId){
        secondTemplateOfPrices.push(newTemplateOfPrices[idx])
      }
    }
    
    this.setState({tempOrder:secondTemplateOfOrder,
    orderPrices:secondTemplateOfPrices})
  }

  render()
  {

    let sideBarContent =
    <>
      
    </>

    let contentContainer =
    <>
      
    </>

    if(this.state.orderHistoryActive)
    {
    contentContainer =
        <>
        <Orderview 
        orderId = {this.state.orderId}
        purchases={ this.state.purchases }
        />
        
        </>

    sideBarContent = <InvoiceHistory
            purchases={ this.state.purchases }
            activeUser={this.state.activeUser}
            overviewChange = {this.overviewChange}
            />
    }

    else{
    contentContainer = 
    <SearchView
              items={ this.state.items.filter((item) => 
              (item.manufucturer.includes(this.state.productSearchString)||
              (item.type.includes(this.state.productSearchString))||
              (item.name.includes(this.state.productSearchString)))) }
              addToOrder ={ this.addToOrder }
        />

    sideBarContent =
    <SideBar 
        tempOrder = {this.state.tempOrder}
        orderPrices = {this.state.orderPrices}
        reduceFromOrder={this.reduceFromOrder}
        makeOrder={ this.makeOrder}
        clearOrderFromTempOrder={ this.clearOrderFromTempOrder }
        auth = {this.state.auth}
        purchases={ this.state.purchases }
        activeUser={this.state.activeUser}
    />

    }

    let output =
      <>
      <MenuBar 
      regDialogActivate = {this.regDialogActivate}
      adminModeActivate = {this.adminModeActivate}
      onSearchFieldChange = {this.onSearchFieldChange}
      checkValid = { this.checkValid }
      historyActivate = { this.historyActivate }
      signOut = { this.signOut }
      orderHistoryActive = { this.state.orderHistoryActive }
      defaultUserBarActive={this.state.defaultUserBarActive}
      customerBarActive={this.state.customerBarActive}
      activeUser={this.state.activeUser}
      
      />
        <div className="container">
          <div className="contentContainer">
          {contentContainer}        
          </div>
          <div className="shoppingCart">
          {sideBarContent}
          </div>
        </div>
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
                  deleteInvoice= { this.deleteInvoice }
               />;
    }


    if(window.localStorage.length != 1 && this.state.startup === 0){
      console.log(window.localStorage.length)
      this.setState({startup: 1})
      console.log("localStorage Tallennettiin.")
    }

    if(this.state.refresh === 0){
      if(localStorage.getItem("items")){
        this.setState({items: JSON.parse(localStorage.getItem("items"))})
      }
      if(localStorage.getItem("users")){
        this.setState({users: JSON.parse(localStorage.getItem("users"))})
      }
      if(localStorage.getItem("purchases")){
        this.setState({purchases:JSON.parse(localStorage.getItem("purchases"))})
      }
      console.log("Refresh tapahtui, tiedot palautettiin localStoragelta.")
      this.setState({refresh: 1})
    }




    return (
      <>
        { output }
      </>
    )
  }
}

export default App;