import { useRef, useEffect } from 'react'
import { collection, query, orderBy, limitToLast } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import TopBar from './TopBar/TopBar'
import MessageList from './MessageList/MessageList'
import MessageInput from './MessageInput/MessageInput'
import MessageToastNotification from '../MessageToastNotification/MessageToastNotification'

export default function ChatRoom({ auth, db }) {
  const dummy = useRef()

  const messagesRef = collection(db, 'messages')
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limitToLast(25))
  const [messages, loading] = useCollectionData(messagesQuery)

  const scrollDown = (behavior) => {
    dummy.current.scrollIntoView({ behavior: behavior })
  }

  useEffect(() => {
    scrollDown('instant')
  }, [loading])

  return (
    <>
      <TopBar auth={auth} />

      <MessageList
        auth={auth}
        messages={messages}
        ref={dummy}
      />

      <MessageToastNotification
        auth={auth}
        messages={messages}
        isLoading={loading}
        scrollDown={scrollDown}
        ref={dummy}
      />

      <MessageInput
        auth={auth}
        dbCollectionRef={messagesRef}
        scrollDown={scrollDown}
      />
    </>
  )
}
