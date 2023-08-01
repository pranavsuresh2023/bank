import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Shared from './Component/Shared'
import Frontpage from './Component/Frontpage';
import Request from './Component/Request';

function App() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Shared/>}>
            <Route index element={<Frontpage/>}/>
            <Route path='/Request' element={<Request/>}/>
            
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
