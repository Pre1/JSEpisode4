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

  // if won't find -> undefined 
  // return books.find(book => book.id === bookId)
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

  // return books.find(
  //   author => author.name.toLowerCase() === authorName.toLowerCase()
  // )
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
    return {
      author: auth.name,
      bookCount: auth.books.length
    }
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
  if (auth) {
    let listAuthBooks = auth.books
    return books
      .filter( (elm) => listAuthBooks.includes(elm.id))
      .map((elm) => elm.title)
  } 

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
  let mostProf = authors[0]
  authors.forEach( (elm) => {
    if (elm.books.length > mostProf.books.length) {
      mostProf = elm
    }
  })
  return mostProf.name
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
  let authNames = getBookById(bookId, books)

  let authTitles = []

  if (authNames.authors.length > 1) {
    authNames.authors.forEach((elm) => { 
      authTitles.push(...titlesByAuthorName(elm.name, authors, books))
    })
    return [...new Set(authTitles)]
  }

  authTitles = titlesByAuthorName(authNames.authors[0].name, authors, books)
  return authTitles
}


/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  authors.forEach(author => {
    author.coauthoringCount = 0;
    authors.forEach(secondAuthor => {
      if (secondAuthor.name !== author.name) {
        const sharedBooks = secondAuthor.books.filter(bookId =>
          author.books.includes(bookId)
        );
        author.coauthoringCount += sharedBooks.length;
      }
    });
  });

  let friendlyAuthor = authors[0];

  authors.forEach(author => {
    if (author.coauthoringCount > friendlyAuthor.coauthoringCount) {
      friendlyAuthor = author;
    }
  });

  return friendlyAuthor.name;
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
