import { Header } from './components/Header/Header'
import { Input } from './components/Input/Input'

import styles from './App.module.css'
import './global.css'

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Input />
      </div>
    </>
  )
}

export default App
