import { useState } from 'react'
import Navbar from './components/Navbar'
import BrowsePage from './pages/BrowsePage'
import PostPage from './pages/PostPage'
import MySessionsPage from './pages/MySessionsPage'
import DocsPage from './pages/DocsPage'
import './App.css'

export default function App() {
  const [activePage, setActivePage] = useState('browse')

  const renderPage = () => {
    switch (activePage) {
      case 'browse': return <BrowsePage />
      case 'post': return <PostPage />
      case 'sessions': return <MySessionsPage setActivePage={setActivePage} />
      case 'docs': return <DocsPage />
      default: return <BrowsePage />
    }
  }

  return (
    <div className="app-root">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  )
}
