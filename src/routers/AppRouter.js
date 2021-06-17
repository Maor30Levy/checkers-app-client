import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../components/home/Home';
import Footer from '../components/main/Footer';
import Header from '../components/main/Header';
import LoginPage from '../components/login/LoginPage';
import NotFoundPage from '../components/main/NotFoundPage';
import LoginRoute from './LoginRoute';
import LoginContextProvider from '../context/LoginContext';
import LobyLoader from '../components/loby/LobyLoader';
import GameRoom from '../components/GameRoom/GameRoom';
import GameRoomRoute from './GameRoomRoute';
import PrivateRoute from './PrivateRoute';
import GameRoomContextProvider from '../context/GameRoomContext';
import BoardContextProvider from '../context/BoardContext';
import ContactUs from '../components/main/ContactUs';
import AboutUs from '../components/main/AboutUs';

const RouterApp = () => {
    return (
        <BrowserRouter >
            <LoginContextProvider>
                <GameRoomContextProvider>
                    <BoardContextProvider>
                        <Header />
                        <Switch>
                            <Route path="/" exact>
                                <Redirect to="/home" />
                            </Route>
                            <LoginRoute path="/login" component={LoginPage} />

                            <GameRoomRoute path="/game-room" component={GameRoom} />

                            <PrivateRoute path="/loby" component={LobyLoader} />
                            <Route path="/home" component={Home} />
                            <Route path="/contact" component={ContactUs} />
                            <Route path="/about" component={AboutUs} />
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                        <Footer />
                    </BoardContextProvider>
                </GameRoomContextProvider>
            </LoginContextProvider>
        </BrowserRouter>
    )
};


export default RouterApp;
