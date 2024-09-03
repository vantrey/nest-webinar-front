import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from './pages/Registration';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ErrorPopup from "./components/ErrorPopup";
import {ErrorProvider} from "./ErrorContext";
import BaseUrlInput from "./components/BaseUrlInput";
import {createAxiosInstance} from "./axiosInstnce";
import ErrorBoundary from "./components/ErrorBoundary";
import UserList from "./pages/UsersList";

function App() {
    const [baseUrl, setBaseUrl] = useState('');

    const handleBaseUrlChange = (newBaseUrl: string) => {
        createAxiosInstance(newBaseUrl);
        setBaseUrl(newBaseUrl);
    };
  return (
      <ErrorProvider>
      <Router>
          <BaseUrlInput onBaseUrlChange={handleBaseUrlChange} />
      <ErrorBoundary>
          {baseUrl && <>
          <Navbar/>
          <ErrorPopup />
          <Switch>
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login}/>
          <Route path="/books/add" component={AddBook}/>
          <Route path="/books/:id" component={BookDetails}/>
          <Route path="/books" component={BookList}/>
          <Route path="/" exact component={BookList}/>
              <Route path="/users" component={UserList} />
        </Switch>
              </>}
      </ErrorBoundary>
      </Router>
      </ErrorProvider>
  );
}

export default App;