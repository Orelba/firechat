import { useState, useRef } from 'react'
import { collection, query, addDoc, orderBy, limitToLast, serverTimestamp } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styles from './chat-room.module.css'
import cx from 'classnames'
import Logo from '../Logo/Logo'
import SignOut from '../SignOut'

export default function ChatRoom({ auth, db }) {
  const dummy = useRef()
  const messagesRef = collection(db, 'messages')
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limitToLast(25))

  const [messages] = useCollectionData(messagesQuery)

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    if (formValue !== '') {
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
  }

  return (
    <>
      <TopBar auth={auth} />

      <div className={styles['message-list']}>
        {messages && messages.map((msg, index) =>
          <ChatMessage key={index} message={msg} auth={auth} />
        )}
        <span ref={dummy}></span>
      </div>


      <form onSubmit={sendMessage}>
        <div className={styles['message-input']}>
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder='Write your message'
          />
          <button>
            <img src="send.svg" alt="Send" height={18} width={16} />
          </button>
        </div>
      </form>
    </>
  )
}

function TopBar({ auth }) {
  return (
    <div className={styles.topbar}>
      <Logo />
      <SignOut auth={auth} />
    </div>
  )
}

function ChatMessage({ message, auth }) {
  const { text, uid, photoURL } = message

  const messageClass = uid === auth.currentUser.uid ? styles.sent : styles.received

  return (
    <div className={cx(styles.message, messageClass)}>
      {messageClass === styles.received && <img src={photoURL} alt="User Avatar" />}
      <p>{text}</p>
    </div>
  )
}