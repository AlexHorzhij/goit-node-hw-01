const contactsActions = require('./contacts');
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
        const cont = await contactsActions.listContacts();
        console.log(cont);
      break;

    case "get":
        const contact = await contactsActions.getContactById(id);
        
        if (contact === null) {
            throw new Error("\x1B[31m Contact not found")
        } 
        console.log(contact);
      break;

    case "add":
        const newContactList = await contactsActions.addContact(name, email, phone);
        console.log(newContactList);

        break;

    case "remove":
        const removedContact = await contactsActions.removeContact(id);
        if (!removedContact) {
            throw new Error("\x1B[31m Contact not found");
        }
        console.log(`Contact ${removedContact[0].name} deleted`, removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);