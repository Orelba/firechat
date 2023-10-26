import { useState, useRef } from 'react'
import firebase from 'firebase/compat/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styles from './chat-room.module.css'
import SignOut from '../SignOut/SignOut'

export default function ChatRoom({ auth, firestore }) {
  const dummy = useRef()

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, { idField: 'id' }) 
  console.log(messages)

  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault()
    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
        <ChatMessage key={index} message={msg} auth={auth} /> // FIX: cant use msg.id as key, useCollectionData was updated.
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
  console.log(message.id)

  const messageClass = uid === auth.currentUser.uid ? styles.sent : styles.received

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="User Avatar" />
      <p>{text}</p>
    </div>
  )
}