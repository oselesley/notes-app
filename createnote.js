// Get the notes array from localStorage, use the location.hash function to pull out the
// id from the url and finally use the id to find the individual note to be edited
// note, also if the note isn't found, by id, return user back to home page
let notes = getSavedNotes('notes')
let id = location.hash.slice(1)
let note = getNote(notes, id)
if (note === undefined) location.assign('./index.html')

// Select the title and body elements and store in a variable to avoid selecting them multiple times
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const lastEdited = document.createElement('span')
lastEdited.textContent = generateLastEdited(note.updatedAt)
document.querySelector('.last-edited').appendChild(lastEdited)

function getNote(notes, id) {
  return notes.find(note => note.id === id)
}

// Populate the title field with the note title on page load and the body field with the note body
function renderNoteToScreen() {
  titleElement.value = note.title
  bodyElement.value = note.body
}
renderNoteToScreen()

// For every input in the title and body fields, the notes array is saved and localStorage updated
titleElement.addEventListener('input', e => {
  note.title = e.target.value
  note.updatedAt = moment().valueOf()
  lastEdited.textContent = generateLastEdited(note.updatedAt)
  saveNotes('notes', notes)
})

bodyElement.addEventListener('input', e => {
  note.body = e.target.value
  note.updatedAt = moment().valueOf()
  lastEdited.textContent = generateLastEdited(note.updatedAt)
  saveNotes('notes', notes)
})

// Return user to homepage
document.querySelector('#home').addEventListener('click', e => {
  location.assign('./index.html')
})

// Delete note and return to homepage
document.querySelector('#remove-note').addEventListener('click', e => {
  removeNote(id, notes)
  saveNotes('notes', notes)
  location.assign('./index.html')
})

// Listen for changes in local storage, if any, get the new data and update all other open tabs
// key elements here are e.newValue and e.key
window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    note = getNote(notes, id)
    lastEdited.textContent = generateLastEdited(note.updatedAt)
    renderNoteToScreen()
  }
})
