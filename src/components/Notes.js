import React, {useContext, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/notes/noteContext'
import AddNotes from './AddNotes'
import NoteItem from './NoteItem'

const Notes = () => {
    let navigate = useNavigate()
    const context = useContext(noteContext)
     // eslint-disable-next-line
    const {notes, getNotes, UpdateNote} = context
    useEffect(()=>{
      if (localStorage.getItem("token")) {
        getNotes()
      } else {
        navigate("/login")
      }
      
      // eslint-disable-next-line
    },[])
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    const ref = useRef(null)
    const refClose = useRef(null)


    const update = async (currentNote) => {
      ref.current.click()
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    
    const submit = (e) => {
      UpdateNote(note.id, note.etitle, note.edescription, note.etag)
      // console.log("Updating the", note)
      refClose.current.click()
    }
    const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value})
    }
    return (
      <>
    <AddNotes/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      value={note.etitle}
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                     value={note.edescription}
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                       value={note.etag}
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      onChange={onChange}
                    />
                  </div>
                  
                  
      </form>
            </div>
            <div className="modal-footer">
              <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={submit} disabled = {note.etitle.length<5 || note.edescription.length < 5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

    <div className="container my-3">
    <h2>Your Notes</h2>
    {notes.length === 0 && "No Notes to show"}
    <div className="row">
    {notes.map((ele)=>{
      return <div key = {ele._id} className='col-md-3 my-4'>
      <NoteItem title = {ele.title} description = {ele.description} id = {ele._id} updateNote = {update} note = {ele}/>
      </div>
    })}
    </div>
    </div> 
    </>
  )
}

export default Notes
