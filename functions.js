/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  let res = books.filter((book) => book.id === bookId)
  return res.length ? res[0] : undefined
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  let res = authors.filter((author) => 
    author.name.toLowerCase() === authorName.toLowerCase())
  return res.length ? res[0] : undefined
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  return authors.map( (auth) => {
    let obj = {
      author: auth.name,
      bookCount: auth.books.length
    }
    return obj
  });
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  books.forEach(obj => {
    if (colors[obj.color]) {
      colors[obj.color].push(obj.title)  
    }
    else {
      colors[obj.color] = [obj.title]
    }
  })
  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here

  let auth = getAuthorByName(authorName, authors)
  // console.log("author object: ", auth)
  if (auth) {
    let listAuthBooks = auth.books
    // console.log("listAuthBooks: ", auth.books)

    let testFilter = books.filter( (elm) => listAuthBooks.includes(elm.id))
    // console.log("testFilter: ", testFilter)
    return books.filter( (elm) => listAuthBooks.includes(elm.id))
    .map((elm) => elm.title)
  } 
  // if the author not found
  else {
    return []
  }
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let mostProf = ''
  let maxBooks = 0
  authors.forEach( (elm) => {
    if (elm.books.length > maxBooks) {
      maxBooks = elm.books.length
      mostProf = elm.name
    }

  })
  return mostProf
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  // let listTitleBooks
  let authNames = books.filter( (book) => bookId === book.id )[0]
  // .authors[0].name
  console.log("authNames: ", authNames)

  let authTitles = []

  if (authNames.authors.length > 1) {
    authNames.authors.forEach((elm) => { 
      authTitles.push(titlesByAuthorName(elm.name, authors, books))
    })
    return [...new Set(authTitles.flat())]
  }

  authTitles = titlesByAuthorName(authNames.authors[0].name, authors, books)
  // console.log("[single] authTitles: ", authTitles)
  return authTitles
}


/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

const authors = require("./authors.json");
const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getBookById(120, books));

// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("Lauren Beukes", authors, books));
// console.log(mostProlificAuthor(authors));
console.log(relatedBooks(46, authors, books));
// console.log(friendliestAuthor(authors));
