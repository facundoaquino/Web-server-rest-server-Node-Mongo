const { ObjectId } = require('mongoose').Types

const colectionAvaible = ['users', 'products', 'categories']
const { User, Category, Product } = require('../models')

const searchUser = async (term, res) => {
	const isMongoId = ObjectId.isValid(term)
	if (isMongoId) {
		const user = await User.findById(term)
		return res.json({ results: user ? [user] : [] })
	}


    const regex = new RegExp(term,'i')

    const users = await User.find({ $or:[{name:regex},{email:regex}] ,$and:[{state:true}] })

    res.json({
        results:users
    })


}


const searchCategories = async (term,res)=>{

    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const category = await Category.findById(term)
        return res.json({
            results:[category]
        })
    }


    
    const regex = new RegExp(term,'i')

    const categories = await Category.find({name:regex,state:true})

    res.json({
        results:categories
    })

}
const searchProducts = async (term,res)=>{

    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const product = await Product.findById(term).populate('category','name')
        return res.json({
            results:[product]
        })
    }


    
    const regex = new RegExp(term,'i')

    const products = await Product.find({name:regex}).populate('category','name')

    res.json({
        results:products
    })

}

const search = (req, res) => {
	const { colection, term } = req.params

	if (!colectionAvaible.includes(colection)) {
		return res.status(400).json({
			msg: 'No es una colection de busqueda valida',
		})
	}

	switch (colection) {
		case 'users':
			searchUser(term, res)
			break
		case 'categories':
			searchCategories(term, res)
			break
		case 'products':
			searchProducts(term, res)
			break

		default:
			res.status(500).json({
				msg: 'error en el servidor',
			})
			break
	}
}

module.exports = {
	search,
}
