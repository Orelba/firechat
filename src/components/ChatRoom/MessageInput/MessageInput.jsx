import styles from './message-input.module.css'
import { useState } from 'react'
import { addDoc, serverTimestamp } from 'firebase/firestore'

export default function MessageInput({ auth, dbCollectionRef, scrollDown }) {
  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    if (formValue !== '') {
      const { uid, photoURL } = auth.currentUser

      await addDoc(dbCollectionRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      })

      setFormValue('')
      scrollDown('smooth')
    }
  }

  return (
    <form onSubmit={sendMessage}>
      <div className={styles['message-input']}>
        <input
          type="text"
          name="message-input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='Write your message'
        />
        <button>
          <img src="send.svg" alt="Send" height={18} width={16} />
        </button>
      </div>
    </form>
  )
}
