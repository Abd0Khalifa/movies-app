import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Navbar from './Componants/Navbar';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import MovieList from './Pages/MovieList';
import MovieShow from './Pages/MovieShow';
import LogIn from './Pages/LogIn';
import Register from './Pages/Register';
import Fav from './Pages/Fav';
import { LanguageContext } from './Context/LanguageContext';
import { useEffect, useState } from 'react';
import { ThemeContext } from './Context/ThemeContext';


function App() {

  const [themeContext, setThemeContext] = useState("dark");
    const [contextLang, setContextLang] = useState('En');

    useEffect(() => {
      document.body.className = themeContext === "dark" ? "dark-theme" : "light-theme";
    }, [themeContext]);
  
  return (

    <ThemeContext.Provider value={{themeContext, setThemeContext}}>
    <LanguageContext.Provider value={{contextLang, setContextLang}}> 
    <BrowserRouter>
      <Navbar />
      <br />
      <Switch>
        <Route path={"/"} component={Home} exact />
        <Route path={"/movies"} component={MovieList} exact />
        <Route path={"/show/:id"} component={MovieShow} exact />
        <Route path={"/Fav"} component={Fav} exact />
        <Route path={"/login"} component={LogIn} exact />
        <Route path={"/register"} component={Register} exact />
        <Route path={"*"} component={NotFound} />

      </Switch>
    </BrowserRouter>
      </LanguageContext.Provider>
      </ThemeContext.Provider>
  );
}

export default App;
