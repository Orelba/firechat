import { forwardRef, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './message-toast-notification.module.css' // Imported after react-toastify css to override it

const MessageToastNotification = forwardRef(function MessageToastNotification({ auth, messages, isLoading, scrollDown }, ref) {
  const initialMessageFetch = useRef(messages)
  const toastId = useRef()

  const callIfElementIsNotIntersecting = (elementRef, callbackFn) => {
    const element = elementRef.current

    const observer = new IntersectionObserver(entries => {
      const elementEntry = entries[0]
      if (!elementEntry.isIntersecting) callbackFn()
      observer.unobserve(element)
    })
    observer.observe(element)
  }

  const notify = () =>
  (toastId.current = toast(
    <ToastContent scrollDown={scrollDown}>New Message</ToastContent>,
    {
      position: 'top-center',
      autoClose: 2000,
      theme: 'dark',
      toastId: 'message-toast',
      className: styles.toast,
    },
  ))

  const update = () => {
    const documents = [...messages].reverse()
    let docCount = 0

    for (let i = 0; i < documents.length; i++) {
      if (documents.at(i).uid !== auth.currentUser.uid) {
        docCount++
      } else {
        break
      }
    }

    const toastText = docCount > 1 ? `${docCount} New messages` : 'New message'
    toast.update(toastId.current, {
      render: <ToastContent scrollDown={scrollDown}>{toastText}</ToastContent>,
    })
  }

  // Don't show a notification on initial messages fetch
  if (initialMessageFetch.current && initialMessageFetch.current !== messages) {
    // Check if message data isn't loading and if the last message isn't sent by the user himself
    if (!isLoading && messages.at(-1).uid !== auth.currentUser.uid) {
      callIfElementIsNotIntersecting(ref, () => {
        // Check if toast exists on screen
        if (toast.isActive("message-toast")) {
          update()
        } else {
          notify()
        }
      })
    }
  } else {
    initialMessageFetch.current = messages
  }

  return <ToastContainer className={styles['toast-container']} />
})

function ToastContent({ scrollDown, children }) {
  return <div onClick={() => scrollDown('smooth')} >{children}</div>
}

export default MessageToastNotification
