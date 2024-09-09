const Order = require('../models/order');

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
  const { customer_name, customer_email, total_price, product_id } = req.body;
  
  // Validar campos obligatorios
  if (!customer_name || !customer_email || !total_price || !product_id) {
    return res.status(400).json({ message: 'Faltan campos obligatorios (customer_name, customer_email, total_price, product_id)' });
  }
  
  try {
    const order = await Order.create({ customer_name, customer_email, total_price, product_id });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
  }
};

// Obtener todos los pedidos
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
  }
};

// Obtener un pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(order);
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
  }
};

// Actualizar el estado de un pedido
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // Validar que el estado esté presente
  if (!status) {
    return res.status(400).json({ message: 'El campo status es obligatorio' });
  }
  
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error al actualizar el estado del pedido:', error);
    res.status(500).json({ message: 'Error al actualizar el pedido', error: error.message });
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
    console.error('Error al eliminar el pedido:', error);
    res.status(500).json({ message: 'Error al eliminar el pedido', error: error.message });
  }
};
