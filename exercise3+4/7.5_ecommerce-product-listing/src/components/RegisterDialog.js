import React, {useState} from 'react'

import styles from './RegisterDialog.module.css'

export default function Dialog(props) {

    const [newFirstname, setNewFirstName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPostNumber, setNewPostNumber] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const addNewUser = () => {
        if(newFirstname != "" || newSurname != "" || newAddress != "" || newPostNumber != "" || newUsername != "" || newPassword != ""){
            props.addNewUser(newFirstname, newSurname, newAddress, newPostNumber, newUsername, newPassword);
            props.disableRegister();
        }
        else{
            alert("Please fill every part of the register dialog!")
        }
    }

        let dialog = (
            <div className={ styles.dialogi }>
            
            <div className={ styles.userText }>Syötä uuden käyttäjän tiedot: </div>
            <div>Etunimi: <input type="text" className={ styles.enterUser } 
                onChange={ (event) => setNewFirstName(event.target.value) }></input></div>
            <div>Sukunimi: <input type="text" className={ styles.enterUser }
                onChange={ (event) => setNewSurname(event.target.value) }></input></div>
            <div>Osoite: <input type="text" className={ styles.enterUser }
                onChange={ (event) => setNewAddress(event.target.value) }></input></div>
            <div>Postinumero: <input type="text" className={styles.enterUser}
                onChange={ (event) => setNewPostNumber(event.target.value)}></input></div>
            <div>Käyttäjänimi: <input type="text" className={ styles.enterUser }
                onChange={ (event) => setNewUsername(event.target.value) }></input></div>
            <div>Salasana: <input type="text" className={ styles.enterUser }
                onChange={ (event) => setNewPassword(event.target.value) }></input></div>
            <div><button onClick={ addNewUser }>Rekisteröi</button><button onClick={ props.disableRegister }>Peruuta</button></div>

        </div>  
    );

    return (
        <div>
            {dialog}
        </div>
    );

}