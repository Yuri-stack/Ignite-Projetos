import { ClipboardText, Trash } from 'phosphor-react'

import styles from './TaskList.module.css'

interface Task {
  id: number
  content: string
  isCompleted: boolean
}

interface TaskListProps {
  tasks: Task[]
  tasksCompleted: number
  onDeleteTask: (id: number) => void
  onCompleteTask: (id: number) => void
}

export function TaskList({ tasks, tasksCompleted, onDeleteTask, onCompleteTask }: TaskListProps) {
  let quantityNotCompleted = tasks.length

  return (
    <section className={styles.tasklistContainer}>
      <header className={styles.tasklistHeader}>
        <p>Tarefas Criadas <span>{quantityNotCompleted}</span></p>
        <p>Concluídas <span>{tasksCompleted} de {quantityNotCompleted}</span></p>
      </header>

      {
        quantityNotCompleted === 0 ? (

          <div className={styles.tasklist}>
            <ClipboardText size={56} weight="thin" />
            <p>Você ainda não tem Tarefas Cadastradas</p>
            <p>Crie tarefas e organize seus items a fazer</p>
          </div>

        ) : (

          tasks.map(task => (

            <div key={task.id} className={styles.task}>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onClick={() => { onCompleteTask(task.id) }}
                readOnly
              />

              <p className={task.isCompleted ? styles.taskChecked : ''}>
                {task.content}
              </p>

              <div>
                <button onClick={() => { onDeleteTask(task.id) }}>
                  <Trash size={22} weight="thin" />
                </button>
              </div>

            </div>

          ))

        )
      }

    </section>
  )
}