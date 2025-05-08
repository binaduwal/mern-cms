import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { MainRouter } from './router/MainRouter.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux'
import { store } from './app/Store.jsx'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Modal from 'react-modal';
Modal.setAppElement('#root');   
import { Toaster } from 'react-hot-toast';

let persistor = persistStore(store);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" />
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <RouterProvider router={MainRouter}/>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
