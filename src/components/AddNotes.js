import React, {useContext, useEffect, useState} from 'react'
import noteContext from '../Context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
     // eslint-disable-next-line
    const {AddNote, getNotes} = context

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const submit = (e) => {
      e.preventDefault();
      AddNote(note.title, note.description, note.tag)
      setNote({title: "", description: "", tag: ""})
    }
    const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
      getNotes()
      // eslint-disable-next-line
    },[])

  return (
    <div className="container">
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            id="title"
            name="title"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={submit} disabled = {note.title.length<5 || note.description.length < 5} >
        Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
