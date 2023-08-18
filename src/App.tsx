import { Suspense } from 'react'
import ChartPage from './ChartPage'
import { AppProvider } from './providers/app'
import { ErrorBoundary } from 'react-error-boundary'
import Spinner from './components/Spiner'

const ErrorFallback = ({ error }: { error: Error }) => (
  <div>
    <h2>エラーが発生しました</h2>
    <p>{error.message}</p>
  </div>
)

const App = () => {
  return (
    <AppProvider>
      <h1>ゆめみ コーディングテスト</h1>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorFallback error={error} />}
      >
        <Suspense fallback={<Spinner />}>
          <ChartPage />
        </Suspense>
      </ErrorBoundary>
    </AppProvider>
  )
}

export default App
