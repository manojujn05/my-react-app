import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState( 
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);

    const addContactHandler = (contact) => {
      console.log(contact);
      setContacts([...contacts, { id: uuidv4(), ...contact }]);
    };
  
    const removeContactHandler = (id) => {
      const newContactList = contacts.filter((contact) => {
        return contact.id !== id;
      });
  
      setContacts(newContactList);
    };

    //useEffect(()=> {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); 
    //if(retriveContacts) setContacts(retriveContacts);
    //}, []);

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)); 
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
        <Route 
        path='/' 
        exact 
        Component={() => (
        <ContactList 
        contacts={contacts}
        getContactId={removeContactHandler}
        />
        )}
        />
        <Route path='/add' 
        Component={() => (
          <AddContact 
          addContactHandler={addContactHandler}
          />
          )}/>
        </Routes>

{/*       <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId = {removeContactHandler} />  */}
      </Router>
    </div>
  );
}
export default App;
