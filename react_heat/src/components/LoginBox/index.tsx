import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext)

  console.log(user)
  
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe a sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGitHub}>
        <VscGithubInverted size={"24"} />
        Entrar com GitHub.
      </a>
    </div>
  )
}