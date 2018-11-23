const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.userValidation = (param) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.one('SELECT username FROM app_user WHERE username = $1', param).then((data) => {
                resolve(data);
                obj.done();                
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.userRegister = (username, password) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.one('INSERT INTO app_user (username, password) VALUES ($1, $2) RETURNING id_user', [username, bcrypt.hashSync(password, 10)]).then((data) => {
                resolve(data)
                obj.done()
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.login = (username) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.one('SELECT * FROM app_user WHERE username = $1', [username]).then((data) => {
                resolve(data)
                obj.done()
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.deleteAccount = (id) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.none('DELETE FROM app_user WHERE id_user = $1', [id]).then(() => {
                resolve();
                obj.done();                
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.getAllProducts = () => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.any('SELECT * FROM product').then((data) => {
                resolve(data);
                obj.done();                
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.none('DELETE FROM product WHERE id_product = $1', [id]).then(() => {
                resolve();
                obj.done();                
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.deleteUserProduct = (id) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.none('DELETE FROM user_products WHERE id_product = $1', [id]).then(() => {
                resolve();
                obj.done();                
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.searchProduct = (param) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.any('SELECT * FROM product WHERE des_product LIKE $1', `%${param}%`).then((data) => {
                resolve(data);
                obj.done();                
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.createProduct = (name, des, price, ava, image) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.one('INSERT INTO product (name, des_product, price, available, image) VALUES ($1, $2, $3, $4, $5) RETURNING id_product', [name, des, price, ava, image]).then((data) => {
                resolve({name: name, des_product: des, price: price, available: ava, image: image, id_product: data.id_product})
                obj.done()
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.addProductProfile = (id_user, id_product) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.one('INSERT INTO user_products (id_user, id_product) VALUES ($1, $2) returning id_user_products', [id_user, id_product]).then((data) => {
                resolve(data)
                obj.done()
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
module.exports.getMyProducts = (id_user) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.any('SELECT id_user_products, product.id_product, name, des_product, price, available, image FROM user_products inner join product on product.id_product = user_products.id_product WHERE user_products.id_user = $1', [id_user])
            .then((data) => {
                resolve(data);
                obj.done();                
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.addProduct = (id_user, id_product) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.one('INSERT INTO user_cart (id_user, id_product) VALUES ($1, $2) returning id_user_cart', [id_user, id_product]).then((data) => {
                resolve(data)
                obj.done()
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports.updateProduct = (id_product, name, des_product, price, ava, image) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.none('UPDATE product SET (name, des_product, price, available, image) = ($2, $3, $4, $5, $6) WHERE id_product = $1', [id_product, name, des_product, price, ava, image]).then((data) => {
                resolve(data);
                obj.done();                
            }).catch((error) => {
                console.log(error)
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

module.exports.removeCartProduct = (id) => {
    return new Promise((resolve, reject) => { 
        db.connect().then((obj) => {
            obj.none('DELETE FROM user_cart WHERE id_user_cart = $1', [id]).then((data) => {
                resolve();
                obj.done();                
            }).catch((error) => {
                reject(error)
                obj.done()    
            })
        }).catch((error) => {
            reject(error)
        })
    })
}