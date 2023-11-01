import { forwardRef } from 'react'
import styles from './message-list.module.css'
import cx from 'classnames'


const MessageList = forwardRef(function MessageList({ auth, messages }, ref) {
  return (
    <div className={styles['message-list']}>
      {messages && messages.map((msg, index) =>
        <ChatMessage key={index} message={msg} auth={auth} />
      )}

      {/* A dummy is used to scroll down and to know if user's chat is scrolled all the way down */}
      <span ref={ref} className={styles.dummy}></span>
    </div>
  )
})

function ChatMessage({ message, auth }) {
  const { text, uid, photoURL } = message

  const messageClass = uid === auth.currentUser.uid ? styles.sent : styles.received

  return (
    <div className={cx(styles.message, messageClass)}>
      {messageClass === styles.received && (
        <img src={photoURL} alt="User Avatar" height={24} width={24} />
      )}
      <p>{text}</p>
    </div>
  )
}

export default MessageList
