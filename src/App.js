import React from "react";
import "./App.css";

import Header from "./partials/header";
import Footer from "./partials/footer";
import ShoppingCart from "./components/shoppingCart";

function App() {
    return (
        <div className="app">
            <Header />
            <section className="sub-header">
                <div className="container pl-3 pr-3">
                    <ul className="wizard-nav display-flex justify-center">
                        <li className="current">
                            <div className="wizard-nav-text">SHOPPING CART</div>
                        </li>
                        <li>
                            <div className="wizard-nav-text">ORDER DETAILS</div>
                        </li>
                        <li>
                            <div className="wizard-nav-text">MAKE PAYMENT</div>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="content-wrapper">
                <div className="container pl-3 pr-3">
                    <div className="alert alert-info">
                        Shop for $5000 or more and get 10% discount on your
                        order
                    </div>

                    <ShoppingCart />
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default App;
