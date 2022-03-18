const express = require('express');

const router = express.Router();
const {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  patchContact,
} = require('../../controllers/contactsController'); // Импорт контроллеров маршрутов

const {
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/contactValidation');

router.get('/', getContacts); // Роут для списка всех контактов
router.get('/:contactId', getContactsById); // Роут для контакта по id
router.post('/', addContactValidation, addContacts); // Роут для создания контакта
router.patch('/:contactId', updateContactValidation, patchContact); // Роут для обновления контакта
router.delete('/:contactId', deleteContact); // Роут для удаления контакта

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message1' });
// });

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

module.exports = router;
