import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './App.css'
import { HomePage, LoginPage, NoPermissionPage, OptionsPage, UserPage, UsersPage } from './pages'
import { useEffect, useState } from 'react'

setupIonicReact();

const State = () => {
  const [ isAuth, setIsAuth ] = useState<boolean>(false)

  useEffect(() => {
    console.log(isAuth)
    if (localStorage.getItem('usuario')) {
      setIsAuth(true)
    }
  }, [isAuth])
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <LoginPage setIsAuth={setIsAuth} />
          </Route>
          <Route exact path="/home">
            {isAuth ? <HomePage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/user">
            {isAuth ? <UserPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/user/:id">
            {isAuth ? <UserPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/users">
            {isAuth ? <UsersPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/options">
            {isAuth ? <OptionsPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/">
            <Redirect to={isAuth ? '/home' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

const App: React.FC = () => (
  <State />
);

export default App;
