import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col footer-left">
                            <div className="row">
                                <div className="col">
                                    <h5>LOREM</h5>
                                    <ul>
                                        <li>
                                            <a href="./">Dummy</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col" />
                                <div className="col" />
                                <div className="col" />
                            </div>
                        </div>
                        <div className="col footer-right">
                            <h5>CALL US</h5>
                            <div className="row small">
                                <div className="col">
                                    <div>Monday-Friday</div>
                                    <div>8am to 9pm CST</div>
                                </div>
                                <div className="col">
                                    <div>Saturday & Sumday</div>
                                    <div>10am to 6pm CST</div>
                                </div>
                            </div>
                            <h3>
                                <img src="./icon/phone.png" alt="CALL" />{" "}
                                1800-123-1234
                            </h3>
                            <div>support.us@test.com</div>
                        </div>
                    </div>
                    <div className="row footer-full text-right">
                        <div className="col">
                            <div>Dummy | Dummy | Dummy | Dummy</div>
                            <div>
                                Lorem ipsumis simply dummy text of the printing
                                and typesetting industry.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
