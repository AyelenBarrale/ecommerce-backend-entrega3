import Carrito from "../models/carts.model.js"

export async function createCarrito(data) {
    try {
        const cart = await Carrito.findOne(data)
        if(!cart) {
            const newCart = new Carrito(data)
            await newCart.save()
        } else {
            return cart;
        }
    } catch (error) {
        throw new Error(error);
    }
}

