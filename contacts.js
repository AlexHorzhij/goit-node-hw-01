const fs = require('fs').promises;
const path = require('path');
const {v4} = require('uuid');

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(i => i.id === contactId.toString());

    return contact;
};

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId.toString());

    if(contactIndex === -1){
        return null
    };
    const deletedContact = contacts.splice(contactIndex, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
};

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: v4(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
};

module.exports = { listContacts, getContactById, addContact, removeContact };
