import { RouterProvider } from 'react-router';
import GlobalProvider from './providers/GlobalProvider';
import router from './router';
import CurrencyProvider from './providers/CurrencyProvider';

function App() {
  return (
    <CurrencyProvider>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </CurrencyProvider>
  );
}

export default App;
