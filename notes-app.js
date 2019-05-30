'use strict'

let notes = getSavedNotes('notes')
let sortEl = document.querySelector('#sort-by')

sortEl.selectedIndex = getSortDefault('sortNum')
const searchFilter = {
  name: '',
  hideFilter: '',
  sortBy: ''
}

// Render Notes contains all the filters which makes sense so 
renderNotes(notes, searchFilter)

document.querySelector('#filter-notes').addEventListener ('input', e => {
  searchFilter.name = e.target.value
  renderNotes(notes, searchFilter)
})

sortEl.addEventListener('change', e => {
  searchFilter.sortBy = e.target.value
  renderNotes(notes, searchFilter)
  saveSortDefault(setDefaultSort(e.target.value))
})

document.querySelector('#new-note').addEventListener('click', e => {
  let id = addNewNote(getSavedNotes('notes'))
  location.assign(`./createnote.html#${id}`)
})

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    renderNotes(notes, searchFilter)
  }
})
