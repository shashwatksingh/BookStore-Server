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
    let temp = await Books.find(
      { title: { $regex: new RegExp(text) } },
      (err, data) => {
        if (err) return res.status(200).json({ message: 'No such book found' });
        if (data.length) {
          return res.status(200).json({
            success: true,
            data,
            message: 'Book found',
          });
        } else {
          return res.status(200).json({
            success: false,
            message: 'No such book found',
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Serval Error',
    });
  }
};

module.exports.details = async (req, res) => {
  try {
    const { id: idBook } = req.params;
    console.log(idBook);
    let book = await Books.findById(idBook);
    if (!book)
      return res.status(200).json({
        success: false,
        message: 'No book found',
      });
    return res.status(200).json({
      book,
      success: true,
      message: 'Book details returned',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Serval Error',
    });
  }
};
