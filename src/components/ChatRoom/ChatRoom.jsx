import { useState, useRef } from 'react'
import { collection, query, addDoc, orderBy, limit, serverTimestamp } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styles from './chat-room.module.css'
import SignOut from '../SignOut/SignOut'

export default function ChatRoom({ auth, db }) {
  const dummy = useRef()
  const messagesRef = collection(db, 'messages')
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25))

  const [messages] = useCollectionData(messagesQuery)
  console.log(messages)
  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    const { uid, photoURL } = auth.currentUser

    await addDoc(collection(db, 'messages'), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <h1>ChatRoom</h1>
      <SignOut auth={auth} />

      {messages && messages.map((msg, index) =>
        <ChatMessage key={index} message={msg} auth={auth} />
      )}

      <div ref={dummy}></div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </>
  )
}

function ChatMessage({ message, auth }) {
  const { text, uid, photoURL } = message

  const messageClass = uid === auth.currentUser.uid ? styles.sent : styles.received

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="User Avatar" />
      <p>{text}</p>
    </div>
  )
}