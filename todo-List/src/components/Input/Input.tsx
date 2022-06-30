import { PlusCircle } from 'phosphor-react'

import styles from './Input.module.css'

export function Input() {

  function handleAddNewTask(){
    console.log('hello')
  }

  return (
    <form className={styles.form} onSubmit={handleAddNewTask}>
      <input 
        name='newTask'
        type="text" 
        placeholder='Adicione uma nova tarefa'
        required
      />

      <button type='submit'>
        Criar
        <PlusCircle size={22} />
      </button>
    </form>
  )
}
