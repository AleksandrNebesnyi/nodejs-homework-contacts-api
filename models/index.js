// const fs = require('fs/promises')
const path = require('path');
// const fs = require('fs/promises');
const fs = require('fs').promises;

const { customAlphabet } = require('nanoid');
const newId = customAlphabet('1234567890', 4);

//   Раскомментируй и запиши значение
// Полный путь к папке с текущим модулем / папка / файл
const contactsPath = path.join(__dirname, 'contacts.json'); // Путь к файлу с контактами
console.log(contactsPath);
// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contactList = JSON.parse(data);
    return contactList;
  } catch (error) {
    console.log(error.massage);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const result = contacts.find(contact => contact.id === Number(contactId));
    if (!result) {
      return null;
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.massage);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === Number(contactId));
    if (idx === -1) {
      return null;
    }
    const deletedContacts = contacts[idx];
    const filteredContacts = contacts.filter(
      contact => contact.id !== Number(contactId),
    );
    const contactsStr = JSON.stringify(filteredContacts, null, 2);

    await fs.writeFile(contactsPath, contactsStr);

    return deletedContacts;
  } catch (error) {
    console.log(error.massage);
  }
}

async function addContact(body) {
  const { name, email, phone } = body;
  // Формирует новый контакт с уникальным id
  const newContact = {
    id: Number(newId()),
    name,
    email,
    phone,
  };
  try {
    const contacts = await listContacts();
    const updateContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));

    return newContact;
  } catch (error) {
    console.log(error.massage);
  }
}

// Обновляет контакт в файле
const updateContact = async (contactId, body) => {
  try {
    const contacts = await await listContacts();

    // Находит нужный контакт по id
    const neededСontact = contacts.find(
      contact => contact.id === Number(contactId),
    );

    // Если контакт есть, тогда формируем новый
    if (neededСontact) {
      const updatedСontact = {
        ...neededСontact,
        ...body,
      };

      // Проходимся по массиву контактов, если id совпадает, тогда возвращаем обновленный контакт (или же старый)
      const result = contacts.map(contact => {
        if (contact.id === Number(contactId)) {
          return updatedСontact;
        } else return contact;
      });

      await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));

      return updatedСontact;
    }
    // //  wiht idx
    // const contacts = await await listContacts();
    // const idx = contacts.findIndex(contact => contact.id === Number(contactId));
    // if (idx === -1) {
    //   return null;
    // }
    // console.log(idx);
    // contacts[idx] = { ...body, contactId };
    // const contactsStr = JSON.stringify(contacts);
    // await fs.writeFile(contactsPath, contactsStr);
    // return contacts[idx];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
