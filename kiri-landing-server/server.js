const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')
const { parse } = require('qs')
const { response } = require('express')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

//categories
const getCategories = (request, response) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


//products
const getProducts = (request, response) => {

  pool.query('SELECT * FROM products left join categories on products.category_id = categories.category_id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//carts
const getCarts = (request, response) => {
  console.log(request.query);
  const product_id = request.query.product_id;

  pool.query('SELECT * FROM carts WHERE product_id = $1', [product_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// const getCartsById = (request, response) => {
//   let product_id = request.params.product_id;

//   pool.query('SELECT * FROM carts WHERE product_id = $1',
//   [product_id],
//   (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

const addCarts = (request, response) => {
  const {cart_quantity, product_id, cart_price, product_name, product_price} = request.body

  pool.query(
    'INSERT INTO carts (cart_quantity, product_id, cart_price, product_name, product_price) VALUES ($1, $2, $3, $4, $5)',
    [cart_quantity, product_id, cart_price, product_name, product_price],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'cart added.'})
    },
  )
}

const deleteCarts = (request, response) => {
  
  const {product_id} = request.params;

  pool.query(
    'delete from carts where product_id = ($1)',
    [product_id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'cart removed.'})
    },
  )
}

app.get("/", (req,res) =>{
  res.send("welcome to kiri_backend")
});

app
  .route('/categories')
  // GET endpoint
  .get(getCategories)
app
  .route('/products')
  //GET endpoint
  .get(getProducts)
  //POST endpoint

//changeCategories
app.get("/products/:category_name", async (req,res) => {
  const {category_name} = req.params;
  try{
    const getProductsByCategory = await pool.query("SELECT * FROM products WHERE category_name = $1", [category_name]);
    res.json(getProductsByCategory.rows);
  } catch(err){
    console.error(err.message);
  }
});

  app
  .route('/carts')
  //GET endpoint
  .get(getCarts)
  //POST endpoint
  .post(addCarts)

app.get('/carts/all', (req, res) =>{
  pool.query(
    'SELECT * FROM carts',
    (error, results) =>{
      if(error){
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
})

// app.get('/carts', getCartsById)

app.delete('/carts/:product_id', deleteCarts)
// app.get ('/carts/:product_id', getCartsById)
  
app.put('/carts/:product_id', (request, response) =>{
  const {product_id} = request.params
  const {cart_quantity, cart_price, cart_note} = request.body

  pool.query(
    'UPDATE carts SET cart_quantity = $1, cart_price = $2, cart_note = $3 WHERE product_id = $4',
    [cart_quantity, cart_price, cart_note, product_id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(200).send('carts modified with ID: ${cart_id}')
    },
  )
})

// Start server
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening`)
})