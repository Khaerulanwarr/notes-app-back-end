/* eslint-disable linebreak-style */
/**
 * import modul
 * addNoteHandler <objek>
 */
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler} = require('./handler');

/**
 * membuat routing untuk menangani perrmintaan pada web seperti
 * input data dengan metod POST
 * melihat data dengan method GET
 * mengubah data dengan method PUT
 * menghapus data menggunakan method DELETE
 * path '/notes'
 */

const routes = [
  /**
   * menangani routing untuk menambahkan catatan pada web server
   */
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  /**
   * menangani routing untuk menampilkan semua catatan pada web server
   */
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  /**
   * menangani routing untuk menampilkan catatan berdasarkan id
   */
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  /**
   * menangani routing untuk menampilkan catatan berdasarkan id
   */
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  /**
   * menangani routing untuk menampilkan catatan berdasarkan id
   */
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

/* export modul routes untuk digunakan pada server */
module.exports = routes;
