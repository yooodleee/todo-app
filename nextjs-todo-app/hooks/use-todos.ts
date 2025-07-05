import { useState, useEffect } from 'react'
import { text } from 'stream/consumers'

export type Todo = {
  id: number
  text: string
  done: boolean
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('todos')
    if (stored) setTodos(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo }
}
