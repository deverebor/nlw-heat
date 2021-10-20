import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import styles from './styles/App.module.scss'

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      <LoginBox />
    </main>
  )
}
