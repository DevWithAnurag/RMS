import React from 'react'
import Navbar from '../navbar/navbar'
import Content from '../content/content'
import Background from '../background/background'
import UserMenu from '../user/userMenu/userMenu'
import Footer from '../footer/footer'
const layout = () => {
    return (
        <>
            <Background></Background>
            <Navbar></Navbar>
            <Content></Content>
            <UserMenu></UserMenu>
            <Footer></Footer>
        </>
    )
}

export default layout
