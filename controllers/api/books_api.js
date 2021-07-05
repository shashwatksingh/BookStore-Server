const Books = require('../../models/books');
//Get all the books contained in the database
module.exports.index = async (req, res) => {
  try {
    //Finding all the books from the database
    books = await Books.find({});
    //Returning responses
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

//Search for a particular text in the book's title in the database
module.exports.search = async (req, res) => {
  try {
    let text = req.query.text;
    //using regex expression to search for the books in the database
    //we are calling the database when the text is not equal to zero
    if (text !== '') {
      let temp = await Books.find(
        { title: { $regex: new RegExp(text) } },
        (err, data) => {
          //Returning responses
          if (err)
            return res.status(200).json({ message: 'No such book found' });
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
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Serval Error',
    });
  }
};

//End point to get particular details of a single book
module.exports.details = async (req, res) => {
  try {
    //Extracting book id from the params of the request
    const { id: idBook } = req.params;
    let book = await Books.findById(idBook);
    //returning responses
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
