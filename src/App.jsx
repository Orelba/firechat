import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatRoom from './components/ChatRoom/ChatRoom'
import SignIn from './components/SignIn/SignIn'

const firebaseConfig = {
  apiKey: 'AIzaSyCW2dbA3FVZ6I4NbIHhloYHkR7X9mfk7og',
  authDomain: 'firechat-93661.firebaseapp.com',
  projectId: 'firechat-93661',
  storageBucket: 'firechat-93661.appspot.com',
  messagingSenderId: '286467978930',
  appId: '1:286467978930:web:59f8334d6277f0aebbfbab',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="interface">
      {user ? <ChatRoom auth={auth} db={db} /> : <SignIn auth={auth} />}
    </div>
  )
}

export default App
