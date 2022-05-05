// Контроллеры - логика обработки маршрутов

// Импорт функций для работы с  БД
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  updateContactStatusById,
  removeContact,
} = require('../services/contactsServices');
// Получение контактов

const getContacts = async (req, res) => {
  const userId = req.user._id;
  const query = req.query;
  console.log(userId);

  const contacts = await getAllContacts(userId, query);
  res.status(200).json({ contacts, status: 'success' });
};
// Получение контакта по id
const getContactsById = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const contact = await getContactById(userId, contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, status: 'success' });
};
// Создание контакта

const addContacts = async (req, res) => {
  const body = req.body;
  const userId = req.user._id;
  if (!body.name && !body.email && !body.phone) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  const contact = await addContact(userId, body);
  res.status(201).json({ contact, status: 'success' });
};
// Обновление контакта
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: 'missing fields' });
  }
  const contact = await updateContactById(userId, contactId, body);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, status: 'success' });
};
// Обновление статуса контакта
const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const userId = req.user._id;

  if (!body) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  const contact = await updateContactStatusById(userId, contactId, body);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ contact, status: 'success' });
};
// Удаление контакта
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await removeContact(userId, contactId);
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
