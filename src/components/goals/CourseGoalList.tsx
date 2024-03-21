import CourseGoal from "./CourseGoal"
import { type CourseGoal as CourseGoalProps } from "./GoalsList"

type CourseGoalListProps = {
  goals: CourseGoalProps[]
  onDeleteGoal: (id: number) => void
}

export default function CourseGoalList({ goals, onDeleteGoal }: CourseGoalListProps) {
  return (
    <ul>
      {goals.map(({ title, description, id }) => (
        <li key={id}>
          <CourseGoal title={title} id={id} onDelete={onDeleteGoal}>
            <p>{description}</p>
          </CourseGoal>
        </li>
      ))}
    </ul>
  )
}