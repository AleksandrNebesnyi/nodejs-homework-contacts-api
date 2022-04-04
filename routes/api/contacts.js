const express = require('express');

const router = express.Router();
const {
  getContacts,
  getContactsById,
  addContacts,
  updateContact,
  updateContactStatus,
  deleteContact,
} = require('../../controllers/contactsController'); // Импорт контроллеров маршрутов
const authenticate = require('../../middlewares/authenticate');
const {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
} = require('../../middlewares/contactValidation');
const { asyncWrapper } = require('../../helpers/asyncWrapper'); // Мидлвар универсального обработчика try catch

router.get('/', authenticate, asyncWrapper(getContacts)); // Роут для списка всех контактов
router.get('/:contactId', authenticate, asyncWrapper(getContactsById)); // Роут для контакта по id
router.post('/', authenticate, addContactValidation, asyncWrapper(addContacts)); // Роут для создания контакта
router.patch(
  '/:contactId',
  authenticate,
  updateContactValidation,
  asyncWrapper(updateContact),
); // Роут для обновления контакта
router.patch(
  '/:contactId/favorite',
  authenticate,
  updateContactStatusValidation,
  asyncWrapper(updateContactStatus),
); //  Роут статуса контакта
router.delete('/:contactId', authenticate, asyncWrapper(deleteContact)); // Роут для удаления контакта

module.exports = router;
