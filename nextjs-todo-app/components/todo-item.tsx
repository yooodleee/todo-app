import { useState, useRef, useEffect } from 'react'
import { Todo } from '../hooks/use-todos'

type Props = {
    todo: Todo
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onUpdate: (id: number, newText: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
    const [editing, setEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editing) inputRef.current?.focus()
    }, [editing])

    const handleEdit = () => {
        setEditing(true)
    }

    const handleSubmit = () => {
        if (editText.trim()) {
            onUpdate(todo.id, editText)
        }
        setEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSubmit()
        if (e.key === 'Escape') {
            setEditText(todo.text)
            setEditing(false)
        }
    }

    return (
        <div className='flex justify-between items-center p-2 border-b'>
            {editing ? (
                <input
                  ref={inputRef}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSubmit}
                  className='flex-1 border rounded p-1 mr-2'
                />
            ) : (
              <span
                className={`flex-1 cursor-pointer ${todo.done ? 'line-through text-gray-400' : ''}`}
                onDoubleClick={handleEdit}
                onClick={() => onToggle(todo.id)}
              >
                {todo.text}
              </span>
            )}
            <button className='text-red-500 hover:text-red-700' onClick={() => onDelete(todo.id)}>
              X
            </button>
        </div>
    )
}