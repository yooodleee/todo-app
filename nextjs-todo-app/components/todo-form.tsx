import { useState } from "react"

type Props = {
    onAdd: (text: string) => void
}

export default function TodoForm({ onAdd }: Props) {
    const [text, setText] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) return
        onAdd(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="할 일을 입력하세요"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                추가
            </button>
        </form>
    )
}