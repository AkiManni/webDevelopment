import React, {Component} from 'react'
import styles from './RegisterDialog.module.css'

class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newFirstname: "",
            newSurname: "",
            newAdress: "",
            newUsername: "",
            newPassword:"",
        }
      }

      

    render() {
        let dialog = (
            <div className={ styles.dialogi }>
            
            <div className={ styles.userText }>Syötä uuden käyttäjän tiedot: </div>
            <div>Etunimi: <input type="text" className={ styles.enterUser }></input></div>
            <div>Sukunimi: <input type="text" className={ styles.enterUser }></input></div>
            <div>Osoite: <input type="text" className={ styles.enterUser }></input></div>
            <div>Käyttäjänimi: <input type="text" className={ styles.enterUser }></input></div>
            <div>Salasana: <input type="text" className={ styles.enterUser }></input></div>
            <div><button>Rekisteröi</button><button onClick={ props.disableRegister }>Peruuta</button></div>
            
        </div>  
    );

    
    return (
        <div>
            {dialog}
        </div>
    );
}
}

export default Dialog;