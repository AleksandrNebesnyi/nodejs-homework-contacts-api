// Контроллеры - логика обработки маршрутов

// Импорт функций для работы с локальной БД (json файлом)
const {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  updateContactStatusById,
  removeContact,
} = require('../models/index');
// Получение контактов

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts, status: 'success' });
};
// Получение контакта по id
const getContactsById = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);
  console.log(contact);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, status: 'success' });
};
// Создание контакта
const addContacts = async (req, res) => {
  const body = req.body;
  if (!req.body.name && !req.body.email && !req.body.phone) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  const contact = await addContact(body);
  res.status(201).json({ contact, status: 'success' });
};
// Обновление контакта
const updateContact = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: 'missing fields' });
  }
  const contact = await updateContactById(contactId, body);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, status: 'success' });
};
// Обновление статуса контакта
const updateContactStatus = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  const contact = await updateContactStatus(contactId, body);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, status: 'success' });
};
// Удаление контакта
const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await removeContact(contactId);
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ result, message: 'contact deleted' });
};

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  updateContact,
  updateContactStatus,
  deleteContact,
};
