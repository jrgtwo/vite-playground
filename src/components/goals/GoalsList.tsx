import Header from './Header.tsx'
import './GoalsList.css'
import reactLogo from '../../assets/react.svg'
import { useCallback, useState } from 'react'
import CourseGoalList from './CourseGoalList.tsx'
import NewGoal from './NewGoal.tsx'

export type CourseGoal = {
  title: string;
  description: string;
  id: number
}

export type GoalToAdd = Omit<CourseGoal, 'id'>

export default function GoalsList() {
  const [goals, setGoals] = useState<CourseGoal[]>([])

  const handleAddGoal = useCallback(({ title, description }: GoalToAdd) => {
    setGoals((prevGoals) => {
      const newGoal: CourseGoal = {
        title,
        description,
        id: Math.random()
      }
      return [...prevGoals, newGoal]
    });
  }, [setGoals]);

  const handleDeleteGoal = useCallback((id: number) => {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== id)
    });
  }, [setGoals]);

  return (
    <main>
      <Header image={{ src: reactLogo, alt: 'ReactLogo' }}>
        <h1>Your Course Goals</h1>
      </Header>
      <NewGoal onAddGoal={handleAddGoal} />
      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
    </main >
  )
}