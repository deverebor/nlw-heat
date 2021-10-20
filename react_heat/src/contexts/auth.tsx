import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string,
  name: string,
  login: string,
  avatar_url: string
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode,
}

type AuthContextData = {
  user: User | null,
  signInUrl: string,
}

type AuthResponse = {
  token: string,
  user: {
    id: string,
    avatar_url: string,
    name:  string,
    login: string
  }
}

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=ffa5b96acf4598f3e44d`

  async function signIn(githubCode: string){
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = response.data

    localStorage.setItem('@dowhile:token', token)

    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('@dohile:token')

    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

        api.get('profile').then(response => {
          console.log(response.data)
        })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasGitHubCode = url.includes('?code=')

    if(hasGitHubCode){
      const [urlWithoutCode, githubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)

      signIn(githubCode)

    }
  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user }}>
       {props.children}
    </AuthContext.Provider>
  )
}