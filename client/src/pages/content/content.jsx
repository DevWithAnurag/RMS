import React from 'react'
import './content.css'
const content = () => {
    return (
        <>
            <div className="content-con">
                <div className="content-item text">
                    <div className="heading">
                        <h1>Order <span>favorite food</span> </h1>
                    </div>
                    <div className="para"><p>
                        Indulge in a delightful dining experience! Enjoy a variety of delicious meals crafted with fresh ingredients and rich flavors. From savory dishes to sweet treats, we bring you the best. Order now and savor every bite!</p></div>
                    <div className="btn">
                        <button>Explore More</button>
                    </div>
                </div>
                <div className="content-item image">
                    <img src="src\assets\content-img.png" alt="Plate" width="100%" />
                </div>
            </div>
        </>
    )
}

export default content
