'use strict'

const getSavedNotes = (title) => {
  let notes = JSON.parse(localStorage.getItem(title))
  return (!notes) ? [] : notes
}

const saveNotes = (title, object) => {
  localStorage.setItem(title, JSON.stringify(object))
}

const renderNotes = (notes, filter) => {
  let notesEl = document.querySelector('.canvas')
  sortNotes(notes, filter.sortBy)
  notes = filterNotes(filter, notes)
  notesEl.innerHTML = ''
  notes.forEach(note => {
    notesEl.appendChild(generateNoteDOM(notes, note, filter))
  })
  if (notes.length < 1) notesEl.appendChild(generateMessageDom())
}

const removeNote = (id, notesArray) => {
  notesArray.splice(notesArray.findIndex(note => note.id === id), 1)
}

const generateNoteDOM = (notes, note, filter) => {
  let noteEl = document.createElement('a')
  let textEl = document.createElement('p')
  let smallEl = document.createElement('small')
  let summaryEl = document.createElement('p')

  let now = moment()
  let lastUpdated = moment(note.updatedAt)

  noteEl.setAttribute('class', 'list-item ')
  noteEl.setAttribute('href', `./createnote.html#${note.id}`)

  smallEl.setAttribute('class', 'fromNow')
  smallEl.setAttribute('class', 'list-item__subtitle')
  smallEl.textContent = `last updated ${lastUpdated.fromNow()}`

  summaryEl.textContent = note.body ? note.body.substring(0, 50) + '.....' : 'No content available'
  summaryEl.classList.add('summary')

  textEl.setAttribute('class', `list-item__title`)
  textEl.textContent = note.title

  // let removeEl = document.createElement('button')
  // // removeEl.setAttribute('class', 'button')
  // removeEl.textContent = 'x'
  // removeEl.addEventListener('click', e => {
  //   removeNote(note.id, notes)
  //   saveNotes('notes', notes)
  //   renderNotes(notes, filter)
  // })

  // noteEl.appendChild(removeEl)
  noteEl.appendChild(textEl)
  noteEl.appendChild(summaryEl)
  noteEl.appendChild(smallEl)
  return noteEl
}

const generateMessageDom = () => {
  let noNotesEl = document.createElement('p')
  noNotesEl.setAttribute('id', 'no-notes')
  noNotesEl.classList.add('empty-message')
  noNotesEl.textContent = 'You have no notes!!'
  return noNotesEl
}

const filterNotes = (searchFilter, notesArray) => {
  return notesArray.filter(note => note.title.toLowerCase().includes(searchFilter.name.toLowerCase()))
}

const validateNotes = (title, notes) => {
  return notes.some(note => note.title.toLowerCase() === title.toLowerCase()) ? 'note already exists!' : (/^\s*$/.test(title) ? 'new note' : title)
}

const addNewNote = (notes) => {
  let now = moment().valueOf()
  let id = uuidv4()
  notes.push({
    title: 'Unnamed note',
    body: '',
    id: id,
    createdAt: now,
    updatedAt: now
  })
  saveNotes('notes', notes)
  return id
}

const generateLastEdited = (timestamp) => {
  return `last edited ${moment(timestamp).fromNow()}`
}

// Sort Notes by category
const sortNotes = (array, value) => {
  let notes = array
  if (value === 'alphabetically') {
    notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
      else if (b.title.toLowerCase() < a.title.toLowerCase()) return 1
      else return 0
    })
  } else if (value === 'byEdited') {
    notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) return -1
      else if (b.updatedAt > a.updatedAt) return 1
      else return 0
    })
  } else if (value === 'byCreated') {
    notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1
      else if (b.createdAt > a.createdAt) return 1
      else return 0
    })
  }
  saveNotes('notes', notes)
}

// Set the default sort category depending on which was used last
// God!! i'm so horry at variable names mataku
// set the sortValue according to which sort value was picked on the selectList
let setDefaultSort = (value) => {
  if (value === 'alphabetically') return 2
  else if (value === 'byCreated') return 1
  else if (value === 'byEdited') return 0
  else return 0
}
// save that value so it can be accessed on page reload and used to set the default sort criteria to be shown
let saveSortDefault = function (value) {
  localStorage.setItem('sortNum', JSON.stringify(value))
}

// Get the value from local storage
let getSortDefault = function (value) {
  let sortNum = JSON.parse(localStorage.getItem(value))
  if (Number.isInteger(sortNum) && sortNum < 3) return sortNum
  else return 0
}
