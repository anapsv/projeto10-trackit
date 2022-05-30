import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Subscribe from './Subscribe';
import Today from './Today';
import History from './History';
import ResetCSS from './assets/ResetCSS';
import GlobalStyle from './assets/GlobalStyle';
import UserContext from './contexts/UserContext';
import React, { useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import Habits from './Habits';

export default function App() {

    const [userInfo, setUserInfo] = useState({});
    let [percent, setPercent] = useState(0);

    return (
        <>
            <UserContext.Provider value={{ userInfo, setUserInfo, percent, setPercent }}>
                <ResetCSS />
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home setUserInfo={setUserInfo} />} />
                        <Route path='/cadastro' element={<Subscribe />} />
                        <Route path='/habitos' element={
                            <>
                                <Header />
                                <Habits />
                                <Menu />
                            </>
                        } />
                        <Route path='/hoje' element={
                            <>
                                <Header />
                                <Today />
                                <Menu />
                            </>
                        } />
                        <Route path='/historico' element={
                            <>
                                <Header />
                                <History />
                                <Menu />
                            </>
                        } />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}