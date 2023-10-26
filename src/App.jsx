import firebase from 'firebase/compat/app'
// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'

import ChatRoom from './components/ChatRoom/ChatRoom'
import SignIn from './components/SignIn/SignIn'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW2dbA3FVZ6I4NbIHhloYHkR7X9mfk7og",
  authDomain: "firechat-93661.firebaseapp.com",
  projectId: "firechat-93661",
  storageBucket: "firechat-93661.appspot.com",
  messagingSenderId: "286467978930",
  appId: "1:286467978930:web:59f8334d6277f0aebbfbab"
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)

  return (
    <>
      {user ? (
        <ChatRoom auth={auth} firestore={firestore} />
      ) : (
        <SignIn auth={auth} />
      )}
    </>
  )
}

export default App
