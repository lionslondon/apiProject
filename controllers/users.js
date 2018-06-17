const User = require('../models/user');
const Car = require('../models/car');

module.exports = {

    index : async (req, res, next) => {
            const users = await User.find({});
            res.status(200).json(users);
    }, 
    newUser: async (req, res, next) =>{
            //const newUser = new User(req.body);
            const newUser = new User(req.value.body)
            const user = await newUser.save();
            res.status(201).json(user);
    },
    getUser: async (req, res, next) =>{
        //const result = Joi.valid(req.params, idSchema);
        //console.log('result', result);
        /* Old way without validation

        const {userId} = req.params;

        */

        const {userId} = req.value.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },
    replaceUser: async (req, res, next) =>{
        //Enforce body should have all the fields
        const {userId} = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({sucecss : true});
    },
    updateUser: async (req, res, next) =>{
        //Enforce body should have those fields that needs to get update
        const {userId} = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({sucecss : true});        
    },

    getUserCars : async (req, res, next) =>{
        const {userId} = req.value.params;
        const user = await User.findById(userId).populate('cars');

        res.status(200).json(user.cars);
    },
    newUserCar: async (req, res, next) =>{
        const {userId} = req.value.params;
        const user = await User.findById(userId);

        const newCar = new Car(req.value.body);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar);

    }


  
}

/*



WE can interact with mongoose in three ways :

1)	Callback
2)	Promise
3)	Async/await


*/

    //callBack
    /*
    index : (req, res, error) => {
        User.find({}, (err, users) =>{
            if(err){
                next(err);
            }
            res.status(200).json(users);
        })
    },
      newUser : (req, res, error) => {
        const newUser = new User(req.body);
        console.log("new User :" + newUser);
        newUser.save((err, user) => {
            console.log("err" , err);
            console.log("new User :" + newUser);
            res.status(201).json(user);
        })
    }
    
    
    
    */

    //Promise
    /*
        index : (req, res, error) => {
        User.find({}).then(users =>{ 
            res.status(200).json(users);
        }).catch(err =>{
            next(err);
        })
    },
    
    newUser :(req, res, error) => {
        const newUser = new User(req.body);
        newUser.save().then(user =>
            res.status(201).json(user)
        ).catch(err => 
            next(err)
        ) 
    }
*/