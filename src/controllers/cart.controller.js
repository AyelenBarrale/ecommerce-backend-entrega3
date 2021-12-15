import Product from "../models/prod.model.js";
import Carrito from "../models/carts.model.js";
import { logger } from "../utils/logger.util.js";

import { sendEmailToUser } from "../services/mail.service.js";

/* --------------- TEST WITH CART AND USER INDEPENDENTS MODELS -------------- */

export async function getCarrito(req, res) {
  const {id} = req.params;
  try {
    const carrito = await Carrito.findById(id);
    logger.info(carrito)
    res.status(200).json({ carrito });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteCarrito(req, res) {
  const { id } = req.params;
  try {
    const deletedCart = await Carrito.findByIdAndDelete(id);
    res.status(200).json({ deletedCart });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function addToCarrito(req, res) {
  const { id } = req.params;
  const prodId = { _id: req.body.id };
  try {
    const carrito = await Carrito.findById(id);

    const producto = await Product.findById(prodId);

    if (!carrito?.productos?.includes(producto)) {
      carrito.productos.push(producto);
      await carrito.save();
    }

    res.status(200).json({ carrito });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function removeFromCarrito(req, res) {
  const cartId = req.params.id;
  const prodId = req.params.id_prod;

  try {
    const updateCart = await Carrito.findByIdAndUpdate(
      { _id: cartId },
      { $pull: { productos: { _id: prodId } } },
      { new: true }
    );

    await updateCart.save;
    console.log(updateCart);
    if (!updateCart?.productos?.includes(prodId)) {
      res.status(200).send("producto eliminado del carrito");
    } else {
      res.status(400).send("el producto no se encuentra en el carrito");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function sendPedido(req, res) {
  const { id } = req.params;

  const populateQuery = [{path: "userId", select: "email username"}, {path: "productos", select: "nombre precio"}]


  try {
    const carrito = await Carrito.findById(id).populate(populateQuery)
    console.log(carrito);

    sendEmailToUser({carrito})
    res.status(200).send(`orden enviada al correo: ${carrito.userId.email} `)
  } catch (error) {
    res.status(400).send(error.message);
  }
}