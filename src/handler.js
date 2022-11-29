/* eslint-disable linebreak-style */
/* import modul */
const {nanoid} = require('nanoid');
const notes = require('./notes');

/*
 * handler menambahkan catatan
 * @param request 'permintaan yang dikirim ke server'
 * @param h
 * return response code, response message, response status, response data<true>
 */
const addNoteHandler = (request, h) => {
  /** destructing JSON 'title<string>','tags <array>string','body<string>' */
  const {title, tags, body} = request.payload;
  /* id <16><string> uniqe
   * createdAt <date>
   * updatedAt <date>
  */
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  /**
   * newNote 'isi catatan baru' ditambahkan ke array notes pada berkas notes
   */
  const newNote = {title, tags, body, id, createdAt, updatedAt};
  notes.push(newNote);

  /**
   * isSuccess <boolean> 'mengirim response'
   * jika berhasil menambah data response true
   * jika gagal menambah data response false
   */
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'succes',
      message: 'Catatan Berhasil Ditambahkan',
      data: {noteId: id},
    });
    response.code(200);
    return response;
  }
  /* fail response */
  const response = h.response({
    status: 'fail',
    message: 'Catatan Gagal Ditambahkan',
  });
  response.code(500);
  return response;
};

/*
 * handler untuk menampilkan semua data catatan
 * return status, notes
 */
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

/*
 * handler untuk menampilkan data catatan berdasarkan id
 */
const getNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'succes',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

/*
 * handler untuk edit data berdasarkan id
 * @param request <object>
 * @param h <hapi>
 */
const editNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const {title, tags, body} = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diperbarui. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

/*
 * menghapus catatan berdasarkan id
 */
const deleteNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(500);
  return response;
};

/* export hendler<object> mengirimkan objek dengan lebih dari satu nilai */
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
