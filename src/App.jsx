import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Perfil from "./routes/Perfil";
import NotFound from "./routes/NotFound";
import Navbar from "./components/Navbar";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import LayoutRedirect from "./components/layouts/LayoutRedirect";

const App = () => {

  const { user } = useContext(UserContext);

  if(user === false){
    return <p>loading...</p>
  }
 
  return (
    <>
      <Navbar/>    
      <Routes>
        <Route path="/" element={ <LayoutRequireAuth/> }>
            <Route index element={ <Home/> }/>
            <Route path="perfil" element={ <Perfil/> }/>
        </Route>

        <Route path="/" element={ <LayoutContainerForm/> }>
            <Route path="/login" element={ <Login/>} />
            <Route path="/register" element={ <Register/>} />
        </Route>

        <Route path="/:nanoid" element={ <LayoutRedirect/> }>
             <Route index element={ <NotFound/>} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
