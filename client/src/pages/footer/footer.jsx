import React from 'react'
import './footer.css'
const footer = () => {
    return (
        <>
            <footer>
                <div className="img">
                    <img src="/src/assets/footer.png" alt="Company Logo" width={"100%"} />
                </div>
                <div className="important-links footer-item">
                    <div className="heading">
                        <h2>Important Links</h2>
                    </div>
                    <div className="item">
                        <p>Blog</p>
                        <p>Report Fraud</p>
                        <p>Contact Us</p>
                    </div>
                </div>
                <div className="about-us footer-item">
                    <div className="heading">
                        <h2>About Us</h2>
                    </div>
                    <div className="item">
                        <p>Who We Are</p>
                        <p>Work With Us</p>
                        <p>How we Deliver</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default footer
