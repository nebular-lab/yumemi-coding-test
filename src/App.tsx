import { Suspense } from 'react'
import ChartPage from './ChartPage'
import { AppProvider } from './providers/app'
import { ErrorBoundary } from 'react-error-boundary'
const App = () => {
  return (
    <AppProvider>
      <h1>ゆめみ コーディングテスト</h1>
      <ErrorBoundary fallback={<div> err</div>}>
        <Suspense fallback={<div>ロード中</div>}>
          <ChartPage />
        </Suspense>
      </ErrorBoundary>
    </AppProvider>
  )
}

export default App
