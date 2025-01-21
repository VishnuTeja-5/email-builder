import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { Dashboard, Editor, Layout, Login, Preview, SignUp } from './components/index.js';
import { Provider } from 'react-redux';
import store from './components/store/store.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route index element={<App />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='edit/:id' element={<Editor />} />
      <Route path='preview' element={<Preview />} />
      <Route path='*' element = {<div>Page Not Found</div>} />
    </Route>
  )  
);

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </>,
)