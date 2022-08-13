const path = require("path");
const fs = require("fs").promises;
require("colors");

const contactsPath = path.join(__dirname + "/db/contacts.json");

function listContacts() {
  const contacts = fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then(console.table)
    .catch(console.warn);
  return contacts;
}

function getContactById(contactId) {
  const contact = fs
    .readFile(contactsPath, "utf-8")
    .then((data) =>
      JSON.parse(data).filter((contact) => contact.id === contactId)
    )
    .then(console.table)
    .catch(console.warn);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  )
    .then(() => console.log("Done!".green))
    .catch(console.warn);
}

async function addContact(name, email, phone) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);

  fs.writeFile(
    contactsPath,
    JSON.stringify([
      ...contacts,
      { id: `${contacts.length + 1}`, name, email, phone },
    ])
  )
    .then(() => console.log("Done".green))
    .catch(console.warn);
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
