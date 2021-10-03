import React from "react";
import Title from './components/Title';
import ShoppingList from './components/ShoppingList';
import styles from './App.module.css';
import './App.css';

/* A ES6 class style stateful component for the shopping list application */
class App extends React.Component {
  constructor(props)
  {
    /* You should call super(props) before any other statement. 
       Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
    */
    super(props);

    this.state = {
      items: [
        { id: 1, value: 'Milk', qty: 5, unit: 'ltr' },
        { id: 2, value: 'Bananas', qty: 6, unit: 'pcs' },
        { id: 3, value: 'Bread', qty: 3, unit: 'x' },
        { id: 4, value: 'Eggs', qty: 16, unit: 'x' }
      ]
    };
    
    
  }


  
  addSomeProducts(value) {
    let items = [...this.state.items];
    let item = {...items[value-1]};
    item.qty = item.qty+(Math.floor(Math.random() * 10) + 1);
    items[value-1] = item;
    this.setState({items});
}
    

    
  addSomeMilk = () => {
      this.setState({ items: [...this.state.items, {id:1, value:"Milk",qty:(Math.floor(Math.random() * 10) + 1), unit:'ltr'}] })
    }
    
  addSomeBananas = () => {
      this.setState({ items: [...this.state.items, {id:2, value:"Bananas",qty:(Math.floor(Math.random() * 10) + 1), unit:'pcs'}] });
    }
    
  addSomeBread = () => {
      this.setState({ items: [...this.state.items, {id:3, value:"Bread",qty:(Math.floor(Math.random() * 10) + 1), unit:'x'}] });
    }
    
  addSomeEggs = () => {
      this.setState({ items: [...this.state.items, {id:4, value:"Eggs",qty:(Math.floor(Math.random() * 10) + 1), unit:'x'}] });
    }
    
  addSomeCarrots = () => {
      this.setState({ items: [...this.state.items, {id:5, value:"Carrots",qty:(Math.floor(Math.random() * 10) + 1), unit:'x'}] });
    }

  addSome(value) {
    
      switch(value){
        case 1:
          if(this.state.items.filter(item => item.value === 'Milk')){
          let indexNumber = this.state.items.filter(item => item.value === 'Milk').map(({ id })=>(
            id  
          ))
          this.addSomeProducts(indexNumber);
          }
          else{
            this.addSomeMilk();
          }
          break;
        case 2:
          if(this.state.items.filter(item => item.value === 'Bananas')){
          let indexNumber = this.state.items.filter(item => item.value === 'Bananas').map(({ id })=>(
            id  
          ))
          this.addSomeProducts(indexNumber);
          }
          else{
            this.addSomeBananas();
          }
          break;
        case 3:
          if(this.state.items.filter(item => item.value === 'Bread')){
          let indexNumber = this.state.items.filter(item => item.value === 'Bread').map(({ id })=>(
            id  
          ))
          this.addSomeProducts(indexNumber);
          }
          else{
            this.addSomeBread();
          }
          break;
        case 4:
          if(this.state.items.filter(item => item.value === 'Eggs')){
          let indexNumber = this.state.items.filter(item => item.value === 'Eggs').map(({ id })=>(
            id  
          ))
          this.addSomeProducts(indexNumber);
          }
          else{
            this.addSomeEggs();
          }
          break;
        case 5:

          if((this.state.items.filter(item => item.value === 'Carrots')) && (this.state.items[4])){
            let indexNumber = this.state.items.filter(item => item.value === 'Carrots').map(({ id })=>(
             id  
            ))
            this.addSomeProducts(indexNumber);
            }
          else{
            this.addSomeCarrots();
          }
          break;
        default:
      }
      
    }

    
  

  

  render()
  {
    const { applicationDescription, applicationName } = this.props;
    return <div className={ styles.shoppingList }>
      <Title 
        applicationDescription={ applicationDescription }
        applicationName={ applicationName }
      />
      <ShoppingList items={ this.state.items } />
      <button onClick={ () => this.addSome(1) }>Maitoa!</button>
      <button onClick={ () => this.addSome(2) }>Banaania!</button>
      <button onClick={ () => this.addSome(3) }>Leipää!</button>
      <button onClick={ () => this.addSome(4) }>Munia!</button>
      <button onClick={ () => this.addSome(5) }>Porkkanoita!</button>
    </div>
  }
}

export default App;