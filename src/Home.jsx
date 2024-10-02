import React from "react"
import Card from "./Card"
import CartItem from "./CartItem"
import './Home.css'

export default function Home()
{
    return (
        <>
            <div className="header">
                <div className="shop-header"><a href="#card-element">Shop</a></div>
                <div className="cart-header"><a href="#cart-element">Cart<badge>(0)</badge></a></div>
            </div>
            <div className="card-list">
                <Card id="card-element"/>
            </div>
            <div className="cart-list">
                <CartItem id="cart-element"/>
            </div>
        </>
    )
}