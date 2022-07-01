import { ClipboardText, Trash } from 'phosphor-react'

import styles from './TaskList.module.css'

export function TaskList() {
  const checked = true

  let tasks = [1, 2, 3, 4]
  let quantity = 4

  return (
    <section className={styles.tasklistContainer}>
      <header className={styles.tasklistHeader}>
        <p>Tarefas Criadas <span>{quantity}</span></p>
        <p>Concluídas <span>0 de {quantity}</span></p>
      </header>

      {
        quantity === 0 ? (

          <div className={styles.tasklist}>
            <ClipboardText size={56} weight="thin" />
            <p>Você ainda não tem Tarefas Cadastradas</p>
            <p>Crie tarefas e organize seus items a fazer</p>
          </div>

        ) : (

          tasks.map(item => (
            <div key={item} className={styles.task}>
              <input type="checkbox" checked={checked} />
              <p className={checked ? styles.taskChecked : ''}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi culpa possimus quae necessitatibus amet facilis ut eligendi voluptatibus? Eos quo qui praesentium a optio placeat consequuntur sed. Distinctio, modi nobis!</p>
              <Trash size={60} weight="thin" />
            </div>
          ))

        )
      }

    </section>
  )
}
