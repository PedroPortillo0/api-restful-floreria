const Product = require('../models/product');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { name, price, stock, description, image_url } = req.body;
  try {
    const product = await Product.create({ name, price, stock, description, image_url });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description, image_url } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    product.name = name;
    product.price = price;
    product.stock = stock;
    product.description = description;
    product.image_url = image_url;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    await product.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};
