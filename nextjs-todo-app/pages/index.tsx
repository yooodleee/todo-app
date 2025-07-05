import Head from "next/head";
import TodoForm from "@/components/todo-form";
import TodoItem from "@/components/todo-item";
import { useTodos } from "@/hooks/use-todos";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos()

  return (
    <>
      <Head>
        <title>Next.js To-Do App</title>
      </Head>
      <main className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">✏️ To-do App</h1>
        <TodoForm onAdd={addTodo} />
        <div className="space-y-2">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo} // 추가
            />
          ))}
        </div>
      </main>
    </>
  )
}