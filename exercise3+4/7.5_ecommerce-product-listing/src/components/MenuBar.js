import React, {useState} from 'react';
import styles from './MenuBar.module.css';

export default function MenuBar(props){

    const onSearchFieldChange = (event) => {

        console.log('Keyboard event');
        console.log(event.target.value);
        props.onSearchFieldChange(event);
      }

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const checkValid = () => {
        if(userName != "" && password != ""){
            props.checkValid(userName,password)
        }
        else{
            alert("Please check username and password!")
        }
    }

    const signOut = () => {
        props.signOut()
    }

    const regDialogActivate = () => {
        props.regDialogActivate();
    }
    const adminModeActivate = () => {
        props.adminModeActivate();
    }

    const historyActivate = () => {
        props.historyActivate();
    }
      


    let defaultUserBar = 
    <>
        <div className={styles.menuBar}> Search: <input className={styles.searchfield} type="text" onChange={ onSearchFieldChange } value={ props.productSearchString }/> 
          <button className={styles.button1} onClick={ regDialogActivate }>Rekisteröidy</button> 
          Käyttäjätunnus: <input className={styles.validationEntry} type="text" onChange={ (event) => setUserName(event.target.value)} />
          Salasana: <input className={styles.validationEntry} type="text" onChange={ (event) => setPassword(event.target.value)} />
          <button className={styles.button2} onClick={ checkValid }>Kirjaudu</button>
          <button onClick={adminModeActivate}>Admin mode</button>
        </div>
    </>

    let customerBar =
    <>
     <div className={styles.menuBar}> <b>{props.activeUser.firstname} {props.activeUser.surname}</b><br/>
     Search: <input className={styles.searchfield} type="text" onChange={ onSearchFieldChange } value={ props.productSearchString }/> 
        <button className={styles.button2} onClick={ historyActivate }>Tilaus Historia</button>
          <button className={styles.button2} onClick={ signOut }>Kirjaudu Ulos</button>
          <button onClick={adminModeActivate}>Admin mode</button>
        </div>
    </>

    let historyBar =
    <>
    <div className={styles.menuBar}> <b>{props.activeUser.firstname} {props.activeUser.surname}</b><br/>
        <button className={styles.button2} onClick={ historyActivate }>Etsi Tuotteita</button>
          <button className={styles.button2} onClick={ signOut }>Kirjaudu Ulos</button>
          <button onClick={adminModeActivate}>Admin mode</button>
        </div>
    </>

    let menuBarContainer =
    <>
        { props.defaultUserBarActive ? <div>{ defaultUserBar }</div> : <></> }
        { props.customerBarActive ? <div>{ customerBar }</div> : <></> }
        { props.orderHistoryActive ? <div>{ historyBar }</div> : <></>}
    </> 

    return(
       <div>{menuBarContainer}</div>
    );
}