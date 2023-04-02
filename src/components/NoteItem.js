import React, {useContext} from 'react'
import noteContext from '../Context/notes/noteContext'


const NoteItem = (props) => {
  const context = useContext(noteContext)
     // eslint-disable-next-line
    const {DeleteNote} = context
    const deleteNote = () => {
      DeleteNote(props.id)
    }
    const {updateNote, note} = props

  return (
    <div>
        <div className="card" style={{"width": "18rem"}}>
            {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <i className="fa fa-pencil mx-2"onClick={()=>{updateNote(note)}}></i> <i className="fa fa-trash-o" onClick={deleteNote}></i>
        </div>
        </div>
    </div>
  )
}

export default NoteItem
