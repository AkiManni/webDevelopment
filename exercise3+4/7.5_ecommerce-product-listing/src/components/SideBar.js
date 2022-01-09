import React from 'react';
import styles from './SideBar.module.css'

export default function SideBar(props){

    const reduceFromOrder = (value, shopId) => {
        props.reduceFromOrder(value, shopId)
     }

     const makeOrder = (index,customerId,shopId,customerName,address,postnumber,totalCost, productsOrdered) => {
      props.makeOrder(index,customerId,shopId,customerName,address,postnumber,totalCost, productsOrdered)
    }

    const clearOrderFromTempOrder = (rId) => {
      props.clearOrderFromTempOrder(rId)
    }

    const compileOrdersAndSend = (rId) => {

      var ref = {};
    
        var res = props.tempOrder.reduce(function(arr, o) {
          
          if (ref.hasOwnProperty(o.shopId))
          
            
            arr[ref[o.shopId]].push(o);
          
          else {
            ref[o.shopId] = arr.length;
            
            arr.push([o]);
          }
          
          return arr;
          
        }, []);
    
    
        var intti = 0;
        for(const element of res){ 
        if(rId === element[0].shopId){
            intti++;
                makeOrder(intti+Math.max.apply(Math, props.purchases.map(function(o) { return o.id; })),props.activeUser.id,0,props.activeUser.firstname + " " + 
                props.activeUser.surname,props.activeUser.address,props.activeUser.postNumber,props.orderPrices.filter((item) => item.id === 0).map(item => item.price),element)
                };
              clearOrderFromTempOrder(0)
            }

    }

    const templateOfOrder = () => {

        var ref = {};
    
        let tempOrderPrices = [...props.orderPrices]
    
        var res = props.tempOrder.reduce(function(arr, o) {
    
          if (ref.hasOwnProperty(o.shopId)){
    
            arr[ref[o.shopId]].push(<div className={styles.orderPreviewList} key={o.id}> 
            <button onClick={() => reduceFromOrder(o.id,o.shopId)}>-</button> <b>{o.quantity}</b> x {o.name} - {o.price} € </div>);
            
        }
          else {
            ref[o.shopId] = arr.length;
            //{arr.push([<div><b>{o.restaurantName}</b></div>])}
            
            arr.push([o].map((item) => <div className={styles.orderPreviewList} key={item.id}>
            <button onClick={() => reduceFromOrder(item.id,item.shopId)}>-</button> <b>{item.quantity}</b> x {item.name} - {item.price} € </div>));
            arr.push(<hr className={styles.orderHorizontal}/>);
            
            arr.push(<div className={styles.totalPriceOfRestaurant}>
            <text className={styles.restaurantTotalText}>Kokonais Summa: </text>
            <b>{tempOrderPrices.filter((item) => item.id === o.shopId).map(item => item.price)}</b> <b className={styles.euromark}>€</b><br/>
            <button onClick={() => compileOrdersAndSend(0)}>Osta</button></div>
            
            )
          }
          
          return arr;
          
        }, []);
    
        return res
      }

    let sideBar =
    <>
      <div className={styles.sideBar}>
      {templateOfOrder()}
      </div>
    </>

    return(
      
        <div className={styles.shoppingCart}><div className={styles.productsToBeOrderedText}>TILATTAVAT TUOTTEET</div>{sideBar}</div>
    );
}