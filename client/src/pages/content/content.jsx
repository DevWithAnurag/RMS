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
                        id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum</p></div>
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
