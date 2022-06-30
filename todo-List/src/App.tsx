import { Header } from './components/Header/Header'
import { Input } from './components/Input/Input'
import { TaskList } from './components/TaskList/TaskList'

import styles from './App.module.css'
import './global.css'

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Input />
        <TaskList />
      </div>
    </>
  )
}

export default App
