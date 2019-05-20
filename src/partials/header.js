import React, { Component } from "react";

export default class Header extends Component {
    state = {
        navList: [
            {
                to: "./",
                label: "Track Order",
                type: "text"
            },
            {
                to: "./",
                alt: "SEARCH",
                image: "./icon/search.png",
                type: "image"
            },
            {
                to: "./",
                alt: "USER",
                image: "./icon/user.png",
                type: "image"
            },
            {
                to: "./",
                alt: "SHOPPING",
                image: "./icon/shopping.png",
                type: "image"
            }
        ]
    };
    render() {
        const { navList } = this.state;
        return (
            <header className="app-header">
                <div className="container pl-3 pr-3 display-flex vertical-center">
                    <div className="logo-container flex-fill">
                        <a href="./">
                            <img src="./images/logo.png" alt="GALE" />
                        </a>
                    </div>
                    <div className="header-nav-container">
                        <ul className="display-flex vertical-center">
                            {navList.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a href={item.to}>
                                            {item.type === "text" ? (
                                                item.label
                                            ) : (
                                                <img
                                                    src={item.image}
                                                    alt={item.alt}
                                                />
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}
