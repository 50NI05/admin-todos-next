'use client'

import { Todo } from "@prisma/client"
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";
import { boolean } from "yup";

interface Props {
  todo: Todo
  toogleTodo: (id: string, complete: boolean) => Promise<Todo|void>
}

export const TodoItem = ({ todo, toogleTodo }: Props) => {
  const [todoOptimistic, toogleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
  )

  const onToogleTodo = async() => {
    try {
      startTransition(() => {
        toogleTodoOptimistic(!todoOptimistic.complete)
      })
      
      await toogleTodo(todoOptimistic.id, !todoOptimistic.complete)

    } catch (error) {
      startTransition(() => {
        toogleTodoOptimistic(!todoOptimistic.complete)
      })
    }
  }

  return (
    <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending }>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div 
          // onClick={() => toogleTodo(todoOptimistic.id, !todoOptimistic.complete) }
          onClick={ onToogleTodo }
        className={`
          flex p-2 rounded-md cursor-pointer
          hover: bg-opacity-60
          ${ todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100' }
        `}>
          {
            todoOptimistic.complete
              ? <IoCheckboxOutline size={30}/>
              : <IoSquareOutline size={30}/> 
          }
        </div>

        <div className="text-center sm:text-left">
          {todoOptimistic.description }
        </div>
      </div>
    </div>
  )
}
