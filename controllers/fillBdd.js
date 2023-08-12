const axios = require("axios");
const { Book, Categorie, Lenguage, Publisher } = require("../db");
const fillBdd = async (req, res) => {
  console.log("ENTER A LA FUNCION BDD");
  const books = [];
  const ISBN = [
    9780385534260, 9780274810567, 9780385528207, 9781250326751, 9780593652961,
    9780063226081, 9780807014271, 9780375726262, 9781878424365, 9786070780363,
    9780988221895, 9780988221895, 9781950922321, 9781476710402, 9780142403877,
    9781644737705, 9789974878068, 9780062511409, 9798388798442, 9780140449266,
    9781529111798, 9780156013987, 9783836587020, 9781452174464, 9780142437964,
    9781419729669, 9780934868075, 9780143106494, 9780140446043, 9780140446456,
    9782070360024, 9780805212679, 9783836587020, 9780863159473, 9780140441185,
    9780805243550, 9780142437186, 9780142437186, 9780143105244, 9780198321668,
    9780198328704, 9780486284699, 9780140150629, 9780140445145, 9780140445145,
    9781442498327, 9781635575576, 9781394196500, 9780545162074, 9781685130732,
    9780142407332, 9781476764665, 9781416995593, 9781728205489, 9780399501487,
    9781416995562, 9781728210292,

    9780789910820, 9798651196104, 9780124077263, 9781118170519, 9798391200475,
    9780739048122, 9783836503990, 9783836535601, 9780739048153, 9780739054628,
    9783836559799, 9783836560146, 9783836529044, 9783836565677, 9781451695199,

    9798388798442, 9788491291916, 9786070788147, 9786070796746, 9781878424532,
    9786070799396, 9786070774249, 9781644737781, 9788419421890, 9786073821001,
  ];
  try {
    for (let i = 0; i < ISBN.length; i++) {
     // console.log(`Se realiza la busqueda del libro:${ISBN[i]}`);
      let { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN[i]}`
      );
      //console.log(`DATA en ${ISBN[i]}`, data);
      // console.log(
      //   "\n//////////////////////////////\n",
      //   "Nuestra estructura: \n",
      //   "id: ",
      //   data.items[0].id,
      //   "\ntitle: ",
      //   data.items[0].volumeInfo.title,
      //   "\nauthor: ",
      //   data.items[0].volumeInfo.authors,
      //   "\ndate:",
      //   data.items[0].volumeInfo.publishedDate,
      //   "\ndescription:",
      //   data.items[0].volumeInfo.description.slice(0, 20),
      //   "\nImg:",
      //   data.items[0].volumeInfo.imageLinks.thumbnail,
      //   "\nLenguage: ",
      //   data.items[0].volumeInfo.language,
      //   "\ncategories: ",
      //   data.items[0].volumeInfo.categories,
      //   "\nPublisher: ",
      //   data.items[0].volumeInfo.publisher,
      //   "\n//////////////////////////////\n"
      // );

      // if (
      //   data.items[0].id &&
      //   data.items[0].volumeInfo.title &&
      //   data.items[0].volumeInfo.authors &&
      //   data.items[0].volumeInfo.publishedDate &&
      //   data.items[0].volumeInfo.description &&
      //   data.items[0].volumeInfo.imageLinks.thumbnail &&
      //   data.items[0].volumeInfo.lenguage &&
      //   data.items[0].volumeInfo.categories &&
      //   data.items[0].volumeInfo.publisher
      // ) {
      const book = {
        id: data.items[0].id,
        title: data.items[0].volumeInfo.title,
        authors: data.items[0].volumeInfo.authors,
        publishedDate: data.items[0].volumeInfo.publishedDate,
        description: data.items[0].volumeInfo.description,
        publihser: data.items[0].volumeInfo.publisher,
        image: data.items[0].volumeInfo.imageLinks.thumbnail,
        lenguage: data.items[0].volumeInfo.language,
        categories: data.items[0].volumeInfo.categories,
      };
      books.push(book);
      //   console.log("BOOK es los Siguiente:", book);
      //   }
    }
    const categories = [];
    const lenguage = [];
    books.forEach((book) => {
      categories.push(book.categories);
      lenguage.push(book.lenguage);
    });
    const aux = categories.flat();
    const result = [];
    aux.forEach((item)=>{
          //pushes only unique element
            if(!result.includes(item)){
              result.push(item);
          }
        })
    console.log("libros: ",books.length,"categories: ", result, "Lenguages:", new Set(lenguage));
    const success = {
      result: "success",
      prueba: "prueba llenar BDD",
    };
    res.status(200).json(success);
  } catch (error) {
    console.log(`error en ${ISBN[i]}`, error);
    res.status(500).json({ message: error.message });
  }
  // books.forEach(book =>{
  //   console.log("//////////////////////////////////////////////////")
  //   console.log("id: " + book.id);
  //   console.log("title: " + book.title);
  //   console.log("authors: " + book.authors);
  //   console.log("publishedDate: " + book.publishedDate);
  //   console.log("description: " + book.description.slice(0, 30));
  //   console.log("publihser: " + book.publihser);
  //   console.log("image: " + book.image);
  //   console.log("lenguage: " + book.lenguage);
  //   console.log("categories: " + book.categories);
  //   console.log("//////////////////////////////////////////////////")
  // }
  // )
};
module.exports = fillBdd;
