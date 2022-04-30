import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { auth, firebase } from 'src/services/firebase'

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

export const AuthContext = createContext({})

export type UserProps = {
  id: string
  name: string
  avatar: string
}

function App() {
  const [user, setUser] = useState<UserProps | undefined>()

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider).then((result) => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google account.')
        }

        setUser({ id: uid, name: displayName, avatar: photoURL })
      }
    })
  }
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
