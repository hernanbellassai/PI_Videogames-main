import {BrowserRouter,Route,Switch} from "react-router-dom";
import Addgame from "./pages/Addgame";
import Error from "./pages/Error";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Landing from "./pages/Landing";


function App() {
  return (
    
    <>
    <Switch>
     <Route exact path={"/"} component={Landing}/>
     <Route path={"/home"} component={Home}/>
     <Route path={"/game/:id"} component={Game}/>
     <Route path={"/addgame"} component={Addgame}/>
     <Route path={"*"} component={Error}/>
     
    </Switch>
    </>
  );
}

export default App;
