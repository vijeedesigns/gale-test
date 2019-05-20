import React, { Component } from "react";
import Spinner from "../utils/spinner";

export default class ShoppingCart extends Component {
    state = {
        data: null,
        selectedPincode: null,
        checkedPincodeOnce: false,
        pincodeValue: ""
    };

    componentDidMount() {
        fetch("./data.json")
            .then(resp => {
                return resp.json();
            })
            .then(data => this.setState({ data }, () => this.processData()));
    }

    processData = () => {
        const { data } = this.state;
        const products = data.products
            ? data.products.map(item => {
                  item.removed = false;
                  item.count = 1;
                  return item;
              })
            : [];
        this.setState({ data: { ...data, products } });
    };

    setProductCount = (count, product) => {
        const { data } = this.state;
        const products = data.products.map(item => {
            if (item.id === product.id) {
                item.count = count;
            }
            return item;
        });
        this.setState({ data: { ...data, products } });
    };

    removefromCart = product => {
        const { data } = this.state;
        const products = data.products.map(item => {
            if (item.id === product.id) {
                item.removed = true;
            }
            return item;
        });
        this.setState({ data: { ...data, products } });
    };

    renderProducts = () => {
        const { data } = this.state;
        return (
            data.products && (
                <div className="cart-table">
                    <div className="cart-table-head">
                        <div className="cart-table-row">
                            <div className="cart-table-col">Product</div>
                            <div className="cart-table-col">Price</div>
                            <div className="cart-table-col">Quantity</div>
                            <div className="cart-table-col">Subtotal</div>
                            <div className="cart-table-col">&nbsp;</div>
                        </div>
                    </div>
                    <div className="cart-table-body">
                        {data.products.map(product => {
                            return !product.removed ? (
                                <div
                                    key={product.id}
                                    className="cart-table-row"
                                >
                                    <div className="cart-table-col">
                                        <div className="cart-item-product-details display-flex vertical-center">
                                            <div className="cart-item-image">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div className="cart-item-data">
                                                {product.gift && (
                                                    <div className="gift-tag">
                                                        {product.gift.name}
                                                    </div>
                                                )}
                                                <h4 className="m-0">
                                                    {product.name}
                                                </h4>
                                                <div className="sub-text">
                                                    {product.desc}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-table-col">
                                        <div className="cart-item-price-details">
                                            {product.price} $
                                        </div>
                                    </div>
                                    <div className="cart-table-col">
                                        <div className="cart-item-quantity-details">
                                            <Spinner
                                                onChange={event =>
                                                    this.setProductCount(
                                                        event,
                                                        product
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="cart-table-col mobile-hidden">
                                        <div className="cart-item-subtotal-details">
                                            <span>
                                                {product.price * product.count}{" "}
                                                $
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cart-table-col mobile-hidden">
                                        <button
                                            type="button"
                                            className="btn btn-icon"
                                            onClick={() =>
                                                this.removefromCart(product)
                                            }
                                        >
                                            <img
                                                src="./icon/DELETE.png"
                                                alt="DELETE"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
            )
        );
    };

    changePinCode = event => {
        this.setState({
            pincodeValue: event.target.value
        });
    };

    checkPinCode = () => {
        const { data, pincodeValue } = this.state;
        const finalPincode = Object.keys(data.pincode).filter(item => {
            return item === pincodeValue;
        })[0];

        this.setState({
            checkedPincodeOnce: true,
            selectedPincode: data.pincode[finalPincode]
                ? data.pincode[finalPincode]
                : null
        });
    };

    renderDeliveryAvailability = () => {
        const {
            data,
            pincodeValue,
            selectedPincode,
            checkedPincodeOnce
        } = this.state;
        return (
            data.pincode && (
                <div className="cart-delivery flex-fill">
                    <h4>Delivery Availability</h4>
                    <div className="field-container">
                        <span className="field-icon">
                            <img src="./icon/LOCATION.png" alt="LOCATION" />
                        </span>
                        <input
                            type="number"
                            value={pincodeValue}
                            onChange={event => this.changePinCode(event)}
                            className="field-input"
                        />
                        <button
                            type="button"
                            className="btn btn-text"
                            onClick={this.checkPinCode}
                        >
                            CHANGE
                        </button>
                    </div>
                    <ul className="delivery-availability-options tick-list">
                        {selectedPincode && !selectedPincode.deliveryPrice ? (
                            <li>Free delivery</li>
                        ) : null}
                        {selectedPincode && selectedPincode.cashOnDelivery ? (
                            <li>Cash on delivery</li>
                        ) : null}
                        {selectedPincode && selectedPincode.estimatedDays ? (
                            <li>
                                Estimated delivery time is{" "}
                                {selectedPincode.estimatedDays.min ===
                                selectedPincode.estimatedDays.max
                                    ? selectedPincode.estimatedDays.min
                                    : `${selectedPincode.estimatedDays.min} - ${
                                          selectedPincode.estimatedDays.max
                                      }`}{" "}
                                days
                            </li>
                        ) : null}
                        {!selectedPincode && checkedPincodeOnce && (
                            <li className="error">Pincode not found!</li>
                        )}
                    </ul>
                </div>
            )
        );
    };

    renderOrderSummary = () => {
        const { data, selectedPincode } = this.state;

        let subtotal = 0;
        let discounts = 0;
        let productCount = 0;
        data.products.map(item => {
            if (!item.removed) {
                subtotal = subtotal + item.price * item.count;
                discounts = item.gift ? discounts + item.gift.price : discounts;
                productCount = productCount + 1;
            }
            return null;
        });

        return (
            data.products && (
                <div className="cart-summary flex-fill">
                    <h4>Order Summary (xx items)</h4>
                    <div className="cart-summary-table">
                        <div className="cart-summary-table-row">
                            <div className="cart-summary-table-cell text-left">
                                Subtotal
                            </div>
                            <div className="cart-summary-table-cell text-right">
                                {subtotal} $
                            </div>
                        </div>
                        <div className="cart-summary-table-row">
                            <div className="cart-summary-table-cell text-left">
                                Total Discount
                            </div>
                            <div className="cart-summary-table-cell text-right">
                                -{discounts} $
                            </div>
                        </div>
                        <div className="cart-summary-table-row">
                            <div className="cart-summary-table-cell text-left">
                                Standard Shipping
                            </div>
                            <div className="cart-summary-table-cell text-right">
                                {selectedPincode &&
                                selectedPincode.deliveryPrice
                                    ? selectedPincode.deliveryPrice
                                    : `Free`}
                            </div>
                        </div>

                        <div className="cart-summary-table-row">
                            <div className="cart-summary-table-cell text-left">
                                Order Total
                            </div>
                            <div className="cart-summary-table-cell text-right">
                                <h2>
                                    {selectedPincode
                                        ? selectedPincode.deliveryPrice +
                                          subtotal -
                                          discounts
                                        : subtotal - discounts}{" "}
                                    $
                                </h2>
                            </div>
                        </div>

                        <div className="cart-summary-table-row">
                            <div className="cart-summary-table-cell text-left text-primary">
                                <a className="text-link" href="./">
                                    CONTINUE SHOPPING
                                </a>
                            </div>
                            <div className="cart-summary-table-cell text-right">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={
                                        !selectedPincode || productCount === 0
                                    }
                                >
                                    CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        );
    };

    render() {
        const { data } = this.state;
        return data ? (
            <React.Fragment>
                <h1>Shopping cart</h1>
                <div className="cart-wrap">
                    {this.renderProducts()}
                    <div className="cart-details display-flex">
                        {this.renderDeliveryAvailability()}
                        {this.renderOrderSummary()}
                    </div>
                </div>
            </React.Fragment>
        ) : (
            <div>Items loading!</div>
        );
    }
}
