import Head from "next/head";
import TodoForm from "@/components/todo-form";
import TodoItem from "@/components/todo-item";
import { useTodos } from "@/hooks/use-todos";
import { useState } from "react";

type Filter = "all" | "active" | "completed"

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos()
  const [filter, setFilter] = useState<Filter>("all")

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.done
    if (filter === "completed") return todo.done
    return true
  })

  return (
    <>
      <Head>
        <title>Next.js To-Do App</title>
      </Head>
      <main className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">✏️ To-do App</h1>
        <TodoForm onAdd={addTodo} />

        {/*filter button UI*/}
        <div className="flex justify-center gap-4 my-4">
          <FilterButton current={filter} value="all" setFilter={setFilter}>전체</FilterButton>
          <FilterButton current={filter} value="active" setFilter={setFilter}>진행 중</FilterButton>
          <FilterButton current={filter} value="completed" setFilter={setFilter}>완료됨</FilterButton>
        </div>

        {/*prints filtering list*/}
        <div className="space-y-2">
          {filteredTodos.map(todo => (
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

// 필터 버튼 재사용 컴포넌트
type FilterButtonProps = {
  current: Filter
  value: Filter
  setFilter: (f: Filter) => void
  children: React.ReactNode
}

function FilterButton({ current, value, setFilter, children }: FilterButtonProps) {
  const isActive = current === value
  return (
    <button
      onClick={() => setFilter(value)}
      className={`px-3 py-1 rounded-full border text-5m transition-all ${
        isActive
          ? "bg-blue-500 text-white"
          : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </button>
  )
}