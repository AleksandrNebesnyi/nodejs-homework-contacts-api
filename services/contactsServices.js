const Contact = require('../schemas/contacts');

// Получает все контакты

const getAllContacts = async (userId, queryString) => {
  const { page = 1, limit = 5, favorite, sort } = queryString;
  const skip = (page - 1) * limit;

  const query = favorite ? { owner: userId, favorite } : { owner: userId };

  const contacts = await Contact.find(query)
    .select('-owner -createdAt -updatedAt')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ sort });
  return contacts;
};

// Находит контакт по id
const getContactById = async (userId, contactId) => {
  const contact = await Contact.findById({
    _id: contactId,
    owner: userId,
  });
  return contact;
};

// Создает новый контакт
const addContact = async (userId, body) => {
  const newContact = await Contact.create({ ...body, owner: userId });
  return newContact;
};

// Обновляет контакт
const updateContactById = async (userId, contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body,
    { new: true },
  ).populate({ path: 'owner', select: 'email subscription' });
  return updatedContact;
};

// Обновляет статус контакт
const updateContactStatusById = async (userId, contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { favorite },
    { new: true },
  ).populate({ path: 'owner', select: 'email subscription' });
  return updatedContact;
};

// Удаляет контакт (возвращает неправильный ответ)
const removeContact = async (userId, contactId) => {
  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return contact;
};
module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  updateContactStatusById,
  removeContact,
};
