const User = require('../models/User');
const Category = require('../models/Categories');
const Item = require('../models/Item');

exports.renderHomepage = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    const products = await Item.find({})
      .sort({ createdAt: -1 })
      .limit(6);

    // Get stats for the stats section
    const stats = {
      totalItems: await Item.countDocuments({}),
      totalCategories: await Category.countDocuments({}),
      totalSellers: await Item.distinct('user_id').length,
      co2Saved: '75K+'
    };

    res.render('home', { 
      categories,  
      stats,
      products,
      title: 'Rewear Exchange | Premium Pre-Loved Fashion'
    });
  } catch (error) {
    console.error('Error rendering homepage:', error);
    res.status(500).send({ message: 'Server error' });
  }
};