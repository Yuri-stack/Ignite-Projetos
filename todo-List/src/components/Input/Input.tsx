import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { TaskList } from '../TaskList/TaskList'

import styles from './Input.module.css'

interface Task {
  id: number
  content: string
  isCompleted: boolean
}

export function Input() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newContentTask, setNewContentTask] = useState('')

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask: Task = {
      id: tasks.length + 1,
      content: newContentTask,
      isCompleted: false
    }

    setTasks([...tasks, newTask])
    setNewContentTask('')
  }

  console.log(tasks)

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewContentTask(event.target.value)
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleAddNewTask}>
        <input
          name='newTask'
          type="text"
          placeholder='Adicione uma nova tarefa'
          value={newContentTask}
          onChange={handleNewTaskChange}
          required
        />

        <button type='submit'>
          Criar
          <PlusCircle size={22} />
        </button>
      </form>

      <TaskList tasks={tasks} />
    </>

  )
}
