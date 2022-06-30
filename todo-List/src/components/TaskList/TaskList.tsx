import { ClipboardText, Trash } from 'phosphor-react'

import styles from './TaskList.module.css'

export function TaskList() {
  return (
    <section className={styles.tasklistContainer}>
      <header className={styles.tasklistHeader}>
        <p>Tarefas Criadas <span>0</span></p>
        <p>Concluídas <span>0 de 5</span></p>
      </header>

      {/* <div className={styles.tasklist}>
        <ClipboardText size={56} weight="thin"/>
        <p>Você ainda não tem Tarefas Cadastradas</p>
        <p>Crie tarefas e organize seus items a fazer</p>
      </div> */}

      <div className={styles.task}>
        <input type="checkbox" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi culpa possimus quae necessitatibus amet facilis ut eligendi voluptatibus? Eos quo qui praesentium a optio placeat consequuntur sed. Distinctio, modi nobis!</p>
        <Trash size={60} weight="thin" />
      </div>

      <div className={styles.task}>
        <input type="checkbox" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi culpa possimus quae necessitatibus amet facilis ut eligendi voluptatibus? Eos quo qui praesentium a optio placeat consequuntur sed. Distinctio, modi nobis!</p>
        <Trash size={60} weight="thin" />
      </div>

    </section>
  )
}
