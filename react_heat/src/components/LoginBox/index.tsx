import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext)
  
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