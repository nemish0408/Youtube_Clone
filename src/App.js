import Body from "./components/Body";
import Head from "./components/Head";
import store from './utils/store'
import {Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div>
        <Head/>
        <Body/>
      </div>
    </Provider>
  );
}

export default App;
