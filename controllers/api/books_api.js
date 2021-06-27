const Books = require('../../models/books');
module.exports.index = async (req, res) => {
  try {
    books = await Books.find({});

    return res.status(200).json({
      books,
      message: 'List of Books',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Serval Error',
    });
  }
};

module.exports.search = async (req, res) => {
  try {
    let text = req.query.text;
    if (text) {
      let book = await Books.findOne({ title: text }, (err, docs) => {
        if (err) return res.status(200).json({ message: 'No such book found' });
        if (docs) {
          return res.status(200).json({
            docs,
            message: 'Book found',
          });
        } else {
          return res.status(200).json({
            message: 'No such book found',
          });
        }
      });
    } else {
      return res.status(400).json({
        message: 'Missing the title',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Serval Error',
    });
  }
};
