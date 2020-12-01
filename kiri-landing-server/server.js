const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

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

const addCategories = (request, response) => {
  const {category_id, category_name} = request.body

  pool.query(
    'INSERT INTO categories (category_name) VALUES ($1)',
    [category_id, category_name],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'category added.'})
    },
  )
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

const addProducts = (request, response) => {
  const {product_id, product_code, product_name, product_price, product_isready, product_image, category_id} = request.body

  pool.query(
    'INSERT INTO products (product_code, product_name, product_price, product_isready, product_image) VALUES ($1, $2, $3, $4, $5)',
    [product_id, product_code, product_name, product_price, product_isready, product_image, category_id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'products added.'})
    },
  )
}

//carts
const getCarts = (request, response) => {
  pool.query('SELECT * FROM carts left join products on carts.product_id = products.product_id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addCarts = (request, response) => {
  const {cart_quantity, cart_note, product_id} = request.body

  pool.query(
    'INSERT INTO carts (cart_quantity, cart_note, product_id) VALUES ($1, $2, $3)',
    [cart_quantity, cart_note, product_id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'cart added.'})
    },
  )
}

const deleteCarts = (request, response) => {
  const {product_id} = request.body

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
  res.json("welcome to kiri_backend")
});

app
  .route('/categories')
  // GET endpoint
  .get(getCategories)
  // POST endpoint
  .post(addCategories)

app
  .route('/products')
  //GET endpoint
  .get(getProducts)
  //POST endpoint
  .post(addProducts)

  app
  .route('/carts')
  //GET endpoint
  .get(getCarts)
  //POST endpoint
  .post(addCarts)
  //delete endpoint
  .post(deleteCarts)


// Start server
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening`)
})