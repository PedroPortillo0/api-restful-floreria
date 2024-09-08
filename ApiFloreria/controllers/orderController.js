const Order = require('../models/order');

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
  const { customer_name, customer_email, total_price, product_id } = req.body;
  try {
    const order = await Order.create({ customer_name, customer_email, total_price, product_id });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
};

// Obtener todos los pedidos
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
};

// Obtener un pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pedido' });
  }
};

// Actualizar el estado de un pedido
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el pedido' });
  }
};

// Eliminar un pedido
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    await order.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el pedido' });
  }
};
