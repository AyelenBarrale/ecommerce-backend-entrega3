import Carrito from "../models/carts.model.js";
import Product from "../models/prod.model.js";
import { logger } from "../utils/logger.util.js";

export async function createCart(req, res) {
  const { userId } = req.body;
  try {
    const newCarrito = new Carrito({ userId });
    await newCarrito.save();
    res.status(200).json(newCarrito.id);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getCart(req, res) {
  const { id } = req.params;
  try {
    const carrito = await Carrito.findById(id).populate("productos");
    res.status(200).json({ carrito });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteCart(req, res) {
  const { id } = req.params;
  try {
    const deletedCart = await Carrito.findByIdAndDelete(id);
    res.status(200).json({ deletedCart });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function postProdsCart(req, res) {
  const { id } = req.params;
  const prodId = { _id: req.body.id };
  try {
    let carrito = await Carrito.findById(id);
    //logger.info(carrito);

    const producto = await Product.findById(prodId);
    //logger.info(producto);

    if (!carrito?.productos?.includes(producto)) {
      carrito.productos.push(producto);
      await carrito.save();
    }

    res.status(200).json({ carrito });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProductCart(req, res) {
  const cartId = req.params.id ;
  const prodId = req.params.id_prod ;

  try {
    
    const updateCart = await Carrito.findByIdAndUpdate(
      {_id: cartId},
      { $pull: { productos: {_id: prodId} } },
      { new: true }
    );

    await updateCart.save;
    logger.info(updateCart);
    if(!updateCart?.productos?.includes(prodId)) {
      res.status(200).send("producto eliminado del carrito");
    } else {
      res.status(400).send('el producto no se encuentra en el carrito')
    }
  

  } catch (error) {
    res.status(400).send(error.message);
  }
}

