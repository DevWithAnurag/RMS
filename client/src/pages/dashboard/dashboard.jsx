import React from 'react'
import AdminLogoutbtn from '../../components/AdminLogoutBtn/btn'
const dashboard = () => {
    return (
        <div>
            <h1>Admin dashboard</h1>
            <a href="/admin/add-menu">Click to enter your Menu</a>
            <AdminLogoutbtn />
        </div>
    )
}

export default dashboard
