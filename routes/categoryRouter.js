import express from 'express';
import Category from '../models/categoryModel.js'; // Adjust the path as per your project structure

const router = express.Router();

// Example route using the Category schema
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

export default router;
