import {nanoid} from 'nanoid';
import { useEffect, useState } from 'react';
import NotesList from './component/NotesList';
import Search from './component/Search'
import Header from './component/Header';
function App() {
  const [notes,setNotes] = useState([
    {
    id: nanoid(),
    text:"This is First Note",
    date: "13-05-2022"
  },
  {
    id: nanoid(),
    text:"This is second Note",
    date: "13-05-2022"
  },{
    id: nanoid(),
    text:"This is third Note",
    date: "13-05-2022"
  },

]);

const [searchText,setSearchText] = useState('');
const [darkMode,setDarkMode] = useState(false);


useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
  );

  if (savedNotes) {
    setNotes(savedNotes);
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    'react-notes-app-data',
    JSON.stringify(notes)
  );
}, [notes]);


const addNote = (text)=>{
  const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleDateString()
  }
  const newNotes = [...notes,newNote];
  setNotes(newNotes);
  
}


const deleteNote = (noteId) => {
  const newnotes = notes.filter((note) => note.id !== noteId);
  setNotes(newnotes);

}

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
        <div className="container">
          <Header handleToggleDarkMode={setDarkMode}/>
          <Search handleSearchNote={setSearchText}/>
          <NotesList notes = {notes.filter((note)=>note.text.toLowerCase().includes(searchText))} handleAddNote = {addNote} handleDeleteNote = {deleteNote} />
        </div>
    </div>
  );
}

export default App;
