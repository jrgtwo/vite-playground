import { useRef, type FormEvent } from "react"

type NewGoalProps = {
  onAddGoal: ({ title, description }: { title: string, description: string }) => void
}

export default function NewGoal({ onAddGoal }: NewGoalProps) {

  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (goal?.current?.value) {
      onAddGoal({
        title: goal.current!.value,
        description: summary.current!.value
      })
    }

    event.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input id="goal" type="text" name="goal" ref={goal} />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" name="summary" ref={summary} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  )
}