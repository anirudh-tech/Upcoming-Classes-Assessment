import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <main className='flex'>
        <Routes>
          <Route path="/admin/" element={<Sidebar />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
