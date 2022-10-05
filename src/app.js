import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import Login from './login/login';
import PersonContainer from './person/person-container'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import AdminContainer from "./admin/admin_container";
import ClientsCRUD from "./admin/client_container";
import DevicesCRUD from "./admin/device_container";
import SensorsCRUD from "./admin/sensor_container";
import ClientContainer from "./client/client_container";
import MonitoredValueContainer from "./admin/components/monitoredValue_container";

class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/person'
                            render={() => <PersonContainer/>}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route
                            exact
                            path='/login'
                            render={() => <Login/>}
                        />

                        <Route
                            exact
                            path='/admin/client'
                            render={() =>  <ClientsCRUD/>
                            }
                        />

                        <Route
                            exact
                            path='/admin/device'
                            render={() =>  <DevicesCRUD/>
                            }
                        />

                        <Route
                            exact
                            path='/admin/sensor'
                            render={() =>  <SensorsCRUD/>
                            }
                        />

                        <Route
                            exact
                            path='/client/client1'
                            render={() =>  <ClientContainer/>
                            }
                        />

                        <Route
                            exact
                            path={'/client/'+ sessionStorage.getItem('username')}
                            render={() =>  <ClientContainer/>
                            }
                        />

                        <Route
                            exact
                            path='/admin/admin'
                            render={() =>  <AdminContainer/>
                            }
                        />

                        <Route
                            exact
                            path={'/admin/'+ sessionStorage.getItem('username')}
                            render={() =>  <AdminContainer/>
                            }
                        />

                        <Route
                            exact
                            path={'/message'}
                            render={() =>  <MonitoredValueContainer/>
                            }
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
