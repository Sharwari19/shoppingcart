import { useState } from "react"
import './CartItem.css';

export default function CartItem()
{
    return(
        <>
            <div className="item-container">
                <img className="cart-item-img" src="https://t3.ftcdn.net/jpg/02/28/87/62/360_F_228876249_pfyLC3Kn976HOyHgzlQ5L2oH4CcYYMyD.jpg" />
                <div className="price-title">
                    <div className="cart-item-price">Price</div>
                    <div className="cart-item-title">Title</div>
                </div>
                <button className="cart-plus-btn">+</button>
                <button className="cart-minus-btn">-</button>
            
            </div>
            <hr />
            <div className="total-container">
                <div className="total">
                    Total
                </div>
                <div className="amount">
                    Amount
                </div>
            </div>
        </>
    )
}