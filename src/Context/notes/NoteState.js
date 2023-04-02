import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {
  const host = `https://note-me-backend-gepece6jp-ali3905.vercel.app/`
  const notesInitial =  [
    {
      "_id": "638ae5921c2050b170390264",
      "user": "6388ac316ba1ffe0836f0260",
      "title": "Routine",
      "description": "Awake up early in the morning",
      "tag": "personal",
      "__v": 0
    },
    {
      "_id": "638ae5931c2050b170390268",
      "user": "6388ac316ba1ffe0836f0260",
      "title": "Routine",
      "description": "Awake up early in the morning",
      "tag": "personal",
      "__v": 0
    },
    {
      "_id": "638ae7147b7a8f17d248c71d",
      "user": "6388ac316ba1ffe0836f0260",
      "title": "Routine",
      "description": "Go to a morning walk",
      "tag": "personal",
      "__v": 0
    },
    {
      "_id": "638ae7227b7a8f17d248c71f",
      "user": "6388ac316ba1ffe0836f0260",
      "title": "Routine",
      "description": "Go",
      "tag": "personal",
      "__v": 0
    },
    {
      "_id": "638ae7267b7a8f17d248c721",
      "user": "6388ac316ba1ffe0836f0260",
      "title": "Routine",
      "description": "Go",
      "tag": "personal",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)
  
  // Fetch all Notes
  const getNotes = async () => {
    // API CAll
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const json = await response.json();
    setNotes(json)
  }
  
  // Add Note
  const AddNote = async (title, description, tag) => {
    // API CAll
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ "title":`${title}`, "description":`${description}`, "tag":`${tag}`,  })
      // body: {
      //   "title": `${title}`,
      //   "description": `${description}`,
      //   "tag": `${tag}`,
      // }
    });
    const note =   {
      "_id": "638ae5921c2050b170390264",
      "user": "6388ac316ba1ffe0836f0260",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  // Update Note
  const UpdateNote = async (id, title, description, tag) => {
    // API CAll
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ "title":`${title}`, "description":`${description}`, "tag":`${tag}`,  })
      // body: {
      //   "title": `${title}`,
      //   "description": `${description}`,
      //   "tag": `${tag}`,
      // }
    });
    getNotes()
    // let newNotes = JSON.parse(JSON.stringify(notes))
    // for (let index = 0; index < notes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id === id) {
    //     newNotes[index].title = title
    //     newNotes[index].description = description
    //     newNotes[index].tag = tag
    //     break;
    //   }
    // }
    // setNotes(newNotes)
  
  }
  // Delete Note
  
  const DeleteNote = async (id) => {
        // API CAll
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
          // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        // const json = await response.json();
    // console.log(json)
    // setNotes(json)
    const newNotes = notes.filter((note)=>{return note._id !== id})
    setNotes(newNotes)
  }


  return (
    <noteContext.Provider value={{notes, AddNote, UpdateNote, DeleteNote, getNotes}}>
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState

