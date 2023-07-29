import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChartPage from './page/Chart';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChartPage />
    </QueryClientProvider>
  );
};

export default App;
