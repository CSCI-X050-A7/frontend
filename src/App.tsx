import { useState } from 'react'
import { useRequest } from 'ahooks';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Api } from './client'

function App() {
  const [count, setCount] = useState(0)
  const { data, loading } = useRequest(
    async () => { return new Api().book.v1BooksList() }
  );
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="card">
        <b>Books List:</b>
        {
          loading ? 'loading...' : data?.data.data?.map((book) => {
            return <div key={book.id}>{book.title}</div>
          })
        }
      </div>
    </>
  )
}

export default App
