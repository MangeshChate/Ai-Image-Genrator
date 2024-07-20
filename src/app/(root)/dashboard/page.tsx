import { DashboardProvider } from '@/contexts/DashboardContext'
import Dashboard from '@/pages/Dashboard'


const DashboardPage = () => {
  return (
    <DashboardProvider>
      <Dashboard/>
    </DashboardProvider>
  )
}

export default DashboardPage
