import Header from './components/Header.tsx'
import './App.css'
import reactLogo from './assets/react.svg'
import { useState } from 'react'
import CourseGoalList from './components/CourseGoalList.tsx'
import NewGoal from './components/NewGoal.tsx'

export type CourseGoal = {
  title: string;
  description: string;
  id: number
}

export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([])

  function handleAddGoal({ title, description }: { title: string, description: string }) {
    setGoals((prevGoals) => {
      const newGoal: CourseGoal = {
        title,
        description,
        id: Math.random()
      }
      return [...prevGoals, newGoal]
    });
  }

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== id)
    });
  }

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