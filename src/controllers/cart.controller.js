import Product from "../models/prod.model.js";
import User from "../models/user.model.js";
import { logger } from "../utils/logger.util.js";

export async function getCart(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const cart = user.cart;
    //logger.info(cart)
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function postProdsCart(req, res) {
  const { id } = req.params;
  const prodId = { _id: req.body.id };
  try {
    const user = await User.findById(id);
    //logger.info(user.cart.productos);

    const producto = await Product.findById(prodId);
    //logger.info(producto);


    if (!user?.cart?.productos?.includes(producto)) {
      user.cart.productos.push({ productId: producto._id, qty: 1 });
      user.cart.totalPrice = producto.precio;
      await user.save();
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProductCart(req, res) {
  const UserId = req.params.id;
  const prodId = req.params.id_prod;

  try {
    /* const updateUserCart = await User.findByIdAndUpdate(
      { _id: UserId },
      { $unset: {  productos: { productId: prodId } } },
      { new: true }
    );

    await updateUserCart.save();
    logger.info(updateUserCart);
    
    if (!updateUserCart?.cart?.productos?.includes(prodId)) {
      res.status(200).send("producto eliminado del carrito");
    } else {
      res.status(400).send("el producto no se encuentra en el carrito");
    } */

    const user = await User.findById(UserId)
    const cart = user.cart

    const isExisting = cart.productos.findIndex(
      (objInProductos) =>
        new String(objInProductos.prodId).trim() ===
        new String(prodId).trim()
    );
    if (isExisting >= 0) {
      cart.productos.splice(isExisting, 1);
      return cart.save();
    }

    res.status(200).json({cart})
  } catch (error) {
    res.status(400).send(error.message);
  }
}
