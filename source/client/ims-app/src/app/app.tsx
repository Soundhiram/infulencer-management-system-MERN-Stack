// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Provider } from 'react-redux';
import AppRoutes from './route/indext';
import store from './store/store';

export function App() {
  return (
    <Provider store={store} >
      <AppRoutes/>
    </Provider>
  );
}

export default App;
