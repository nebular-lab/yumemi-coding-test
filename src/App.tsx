import { Suspense } from 'react'
import ChartPage from './ChartPage'
import { AppProvider } from './providers/app'
import { ErrorBoundary } from 'react-error-boundary'
import Spinner from './components/Spiner'
const App = () => {
  return (
    <AppProvider>
      <h1>ゆめみ コーディングテスト</h1>
      <ErrorBoundary
        fallback={<div>データの読み取り最中にエラーが起きました</div>}
      >
        <Suspense fallback={<Spinner />}>
          <ChartPage />
        </Suspense>
      </ErrorBoundary>
    </AppProvider>
  )
}

export default App
