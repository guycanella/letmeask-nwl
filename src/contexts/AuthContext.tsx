import { createContext, ReactNode, useEffect, useState } from "react"

import firebase from "firebase/compat/app"
import { auth } from "src/services/firebase"

type UserType = {
	id: string
	name: string
	avatar: string
}
  
type AuthType = {
	user: UserType | undefined
	signInWithGoogle: () => Promise<void>
}

type AuthContextProviderType = {
	children: ReactNode
}
  
export const AuthContext = createContext({} as AuthType)

export const AuthContextProvider = (props: AuthContextProviderType) => {
	const [user, setUser] = useState<UserType | undefined>()

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google account.')
      }

      setUser({ id: uid, name: displayName, avatar: photoURL })
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user
  
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google account.')
        }
  
        setUser({ id: uid, name: displayName, avatar: photoURL })
      }
    })

    return () => {
      unsubscribe()
    }
  })

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	)
}
