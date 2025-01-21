const pool = require('../config/db');
const { sampleProperties } = require('../data/sampleProperties');

const getAllProperties = async (req, res) => {
  try {
    const { type, location, minPrice, maxPrice } = req.query;
    let query = `
      SELECT p.*, u.name as seller_name 
      FROM properties p 
      LEFT JOIN users u ON p.user_id = u.id 
      WHERE 1=1
    `;
    const params = [];

    if (type) {
      query += ` AND p.type = ?`;
      params.push(type);
    }
    if (location) {
      query += ` AND p.location = ?`;
      params.push(location);
    }
    if (minPrice) {
      query += ` AND p.price >= ?`;
      params.push(minPrice);
    }
    if (maxPrice) {
      query += ` AND p.price <= ?`;
      params.push(maxPrice);
    }

    query += ` ORDER BY p.created_at DESC`;

    const [properties] = await pool.query(query, params);
    
    const formattedProperties = properties.map(property => ({
      ...property,
      images: JSON.parse(property.images || '[]')
    }));

    const allProperties = [...sampleProperties, ...formattedProperties];

    res.json(allProperties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const [property] = await pool.query(
      `SELECT p.*, u.name as seller_name, u.email as seller_email, u.phone as seller_phone
       FROM properties p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (!property.length) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const formattedProperty = {
      ...property[0],
      images: JSON.parse(property[0].images || '[]')
    };

    res.json(formattedProperty);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, type, images } = req.body;
    const userId = req.user.userId;

    const [result] = await pool.query(
      'INSERT INTO properties (title, description, price, location, type, images, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, price, location, type, JSON.stringify(images), userId]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      price,
      location,
      type,
      images,
      user_id: userId
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { title, description, price, location, type, images, status } = req.body;
    const propertyId = req.params.id;
    const userId = req.user.userId;

    const [property] = await pool.query(
      'SELECT * FROM properties WHERE id = ? AND user_id = ?',
      [propertyId, userId]
    );

    if (!property.length) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }

    await pool.query(
      'UPDATE properties SET title = ?, description = ?, price = ?, location = ?, type = ?, images = ?, status = ? WHERE id = ?',
      [title, description, price, location, type, JSON.stringify(images), status, propertyId]
    );

    res.json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user.userId;

    const [result] = await pool.query(
      'DELETE FROM properties WHERE id = ? AND user_id = ?',
      [propertyId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
}; 