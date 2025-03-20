import React from 'react'
import AdminLogoutbtn from '../../components/AdminLogoutBtn/btn'
import './dashboard.css'
const dashboard = () => {
    return (
        <>
            <div className="dashboard-container">
                {/* <div className="header">
                    <h2>Welcome to Admin Dashboard</h2>
                </div> */}
                <div className="content">
                    <div className="left">
                        <div className="profile">
                            <img src="src\assets\admin-img.jpeg" alt="admin iamge" width={"120px"} />
                            <p>Welcome,Admin</p>
                            <div className="logoutbtn"><AdminLogoutbtn /></div>
                        </div>
                        <div className="links">
                            <a href="/admin/add-menu">Click to enter your Menu</a>
                        </div>

                    </div>
                    <div className="right">
                        this is right
                    </div>
                </div>
            </div>
        </>
    )
}

export default dashboard
