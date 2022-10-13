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
import { ClientPage, ClientsPage, HomePage, LoginPage, NoPermissionPage, OptionsPage, TemplatePage, TemplatesPage, UserPage, UsersPage, WorkOrderPage, WorkOrdersPage, WorkOrdersUserPage, WorkOrderUserPage } from './pages'
import { useEffect, useState } from 'react'
import { Usuario } from './interfaces/Usuario'
import { MenuContainer } from './components/containers'

setupIonicReact();

const State = () => {
  const [ isAuth, setIsAuth ] = useState<boolean>(false)
  const [ userType, setUserType ] = useState<string | undefined>('')

  useEffect(() => {
    console.log(isAuth)
    if (localStorage.getItem('usuario')) {
      const usuario : Usuario = JSON.parse(window.localStorage.getItem('usuario')||'{}')
      setUserType(usuario.role)
      setIsAuth(true)
    }
  }, [isAuth])
  
  return (
    <IonApp>
      <IonReactRouter>
        { (userType === 'usuario') && <MenuContainer /> }
        <IonRouterOutlet id='main'>
          <Route exact path="/login">
            <LoginPage setIsAuth={setIsAuth} setUserType={setUserType} />
          </Route>
          <Route exact path="/home">
            {isAuth ? <HomePage userType={userType} /> : <NoPermissionPage />}
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
          <Route exact path="/clients">
            {isAuth ? <ClientsPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/client">
            {isAuth ? <ClientPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/client/:id">
            {isAuth ? <ClientPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/work-orders-user">
            {isAuth ? <WorkOrdersUserPage /> : <NoPermissionPage />}
          </Route>
          {/* <Route exact path="/work-order-user">
            {isAuth ? <WorkOrderPage /> : <NoPermissionPage />}
          </Route> */}
          <Route exact path="/work-order-user/:id">
            {isAuth ? <WorkOrderUserPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/work-orders">
            {isAuth ? <WorkOrdersPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/work-order">
            {isAuth ? <WorkOrderPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/work-order/:id">
            {isAuth ? <WorkOrderPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/templates">
            {isAuth ? <TemplatesPage /> : <NoPermissionPage />}
          </Route>
          <Route exact path="/template/:id">
            {isAuth ? <TemplatePage /> : <NoPermissionPage />}
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
