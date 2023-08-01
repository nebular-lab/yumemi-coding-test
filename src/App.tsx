import ChartPage from './page/Chart'
import { AppProvider } from './providers/app'

const App = () => {
  return (
    <AppProvider>
      <ChartPage />
    </AppProvider>
  )
}

export default App
