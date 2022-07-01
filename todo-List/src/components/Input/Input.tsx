import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
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
  const [tasksCompleted, setTasksCompleted] = useState(0)

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask: Task = {
      id: Math.random(),
      content: newContentTask,
      isCompleted: false
    }

    setTasks([...tasks, newTask])
    setNewContentTask('')
  }

  function handleNewContentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewContentTask(event.target.value)
  }

  function handleDeleteTask(id: number) {
    const tasksNotDeleted = tasks.filter(task => task.id != id)
    setTasks(tasksNotDeleted)
    countTasksCompleted(tasksNotDeleted)
  }

  function handleCompleteTask(id: number) {
    const newListTask = tasks
      .map(task => task.id === id ? {
        ...task,                        // espalho os campos da Task (id, content, isCompleted)
        isCompleted: !task.isCompleted  // sobrescrevo o isCompleted, sempre invertendo o valor
      } : task)

    countTasksCompleted(newListTask)
    setTasks(newListTask)
  }

  function countTasksCompleted(tasks: Task[]){
    const quantityTasksCompleted = tasks.filter(task => task.isCompleted != false).length
    setTasksCompleted(quantityTasksCompleted)
  }

  function handleTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Esse campo é obrigatório!')
}

  return (
    <>
      <form className={styles.form} onSubmit={handleAddNewTask}>
        <input
          name='newTask'
          type="text"
          placeholder='Adicione uma nova tarefa'
          value={newContentTask}
          onChange={handleNewContentChange}
          onInvalid={handleTaskInvalid}
          required
        />

        <button type='submit'>
          Criar
          <PlusCircle size={22} />
        </button>
      </form>

      <TaskList
        tasks={tasks}
        tasksCompleted={tasksCompleted}
        onDeleteTask={handleDeleteTask}
        onCompleteTask={handleCompleteTask}
      />
    </>

  )
}
