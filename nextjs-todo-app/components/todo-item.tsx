import { Todo } from '../hooks/use-todos'

type Props = {
    todo: Todo
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
    return (
        <div className='flex justify-between p-2 border-b'>
            <span
              className={`cursor-pointer ${todo.done ? 'line-through text-gray-400' : ''}`}
              onClick={() => onToggle(todo.id)}
            >
                {todo.text}
            </span>
            <button className='text-red-500' onClick={() => onDelete(todo.id)}>X</button>
        </div>
    )
}