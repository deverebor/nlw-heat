import { useContext, useState, FormEvent } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export function SendMessageForm(){
  const { user, signOut } = useContext(AuthContext)
  const [message, setMessage] = useState('')

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    if(!message.trim()) {
      toast.error("Impossível enviar mensagens vazias")
      return
    }

    await api.post('messages', { message })
    toast.success('Mensagem enviada com sucesso!')

    setMessage('')
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.sendMessageFormWrapper}>
        <button onClick={signOut} className={styles.signOutButton}>
          <VscSignOut size={"32"} />
        </button>

        <header className={styles.userInformation}>
          <div className={styles.userImage}>
            <img src={user?.avatar_url} alt={user?.name} />
          </div>
          <strong className={styles.userName}>{user?.name}</strong>
          <span className={styles.userGitHub}>
            <VscGithubInverted size={"16"} />
            {user?.login}
          </span>
        </header>

        <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
          <label htmlFor="message">Mensagem</label>
          <textarea
            name="message"
            id="message"
            placeholder="Qual sua expectativa para o evento ?"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          />

          <button type="submit">Enviar Mensagem</button>
        </form>
      </div>
    </>
  );
}