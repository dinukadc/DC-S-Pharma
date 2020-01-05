const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.port || 3002 || 3001 || 3000;


const mongoose1 = require('./DBSchema/Customer');
const mongoose2 = require('./DBSchema/Prescription');
const mongoose3 = require('./DBSchema/PaymentGateways/Dialog');
const mongoose4 = require('./DBSchema/PaymentGateways/Sampath');
const mongoose5 = require('./DBSchema/Payment');


const CustomerSchema = mongoose1.model('Customer');
const PrescriptionSchema = mongoose2.model('Prescription');
const DialogSchema = mongoose3.model('dialog');
const SampathSchema = mongoose4.model('sampath');
const PaymentSchema = mongoose5.model('Payment');


const Mongo_DB_Base_URL = "mongodb://127.0.0.1:27017";

// Server Startup
app.listen(PORT, function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Pharmacy server is running on port ' + PORT);
});

// To resolve cross origin issues
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



// Connect to DataBase
mongoose1.connect(Mongo_DB_Base_URL+"/Customer", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Customer DataBase is connected');
});

mongoose2.connect(Mongo_DB_Base_URL+"/Prescription", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Prescription DataBase is connected');
});

mongoose3.connect(Mongo_DB_Base_URL+"/Dialog", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to Dialog Payment Gateway ..');
});

mongoose4.connect(Mongo_DB_Base_URL+"/Sampath", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to Sampath Payment Gateway..');
});


mongoose5.connect(Mongo_DB_Base_URL+"/Payment", function (err) {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Payment DataBase is connected');
});


// REST API for Customer

app.get('/Customer',function(req, res) {
    CustomerSchema.find().exec().then(function (customer) {
        res.status(200).send(customer);
    }).catch(function (err) {
        res.status(400).send('Request Failed');
    });

});

app.get('/Customer/:id',function(req, res) {
    CustomerSchema.find({_id:req.params.id}).exec().then(function (customer) {
        res.status(200).send(customer);
    }).catch(function (err) {
        res.status(404).send('Request Failed');
    });
});

app.post('/Customer', function (req, res) {

    const data = new CustomerSchema(req.body);
    console.log(req.body);
    data.save().then(function (data) {
        res.status(201).send(data);
    }).catch(function () {
        res.status(404).send({message:'Request Failed'});
    });
});

app.post('/Customer/login', function (req, res) {
    if(!req.body) {
        res.status(404).send('Cannot find the Customer..');
        return;
    }

    CustomerSchema.find({username:req.body.username,password:req.body.password}).exec().then(function (customer) {
        res.status(200).send(customer[0]);
    }).catch(function (err) {
        res.status(404).send('Cannot find the Customer..');
    });

});

app.put('/Customer/:id', function (req, res) {
    CustomerSchema.update({_id:req.params.id}, req.body).then(function (customer) {
        res.status(200).send({customer: customer, message: 'updated'});
    }).catch(function () {
        res.status(400).send({message:'Request Failed '});
    });
});

app.delete('/Customer/:id', function (req, res) {
    CustomerSchema.remove({_id: req.params.id}).then(function () {
        res.status(200).send({message:'deleted'});
    }).catch(function () {
        res.status(400).send({message:'Request Failed'});
    });
});


// REST API for Prescription

app.get('/Prescription',function(req, res) {
    PrescriptionSchema.find().exec().then(function (prescription) {
        res.status(200).send(prescription);
    }).catch(function (err) {
        res.status(400).send('Request Failed');
    });
});

app.get('/Prescription/:name',function(req, res) {
    PrescriptionSchema.find({name:req.body.name}).exec().then(function (prescription) {
        res.status(200).send(prescription);
    }).catch(function (err) {
        res.status(400).send('Request Failed');
    });
});

app.post('/Prescription',function(req, res) {
    const prescription = new PrescriptionSchema(req.body);
    prescription.save().then(function (prescription) {
        res.status(200).send(prescription);
    }).catch(function (err) {
        res.status(400).send('Request Failed');
    });
});

app.put('/Prescription/:id', function (req, res) {
    CustomerSchema.update({_id:req.params.id}, req.body).then(function (customer) {
        res.status(200).send({customer: customer, message: 'updated'});
    }).catch(function () {
        res.status(400).send({message:'Request Failed'});
    });
});


app.put('/Prescription/:id', function (req, res) {
    PrescriptionSchema.update({_id:req.params.id}, req.body).then(function (prescription) {
        res.status(200).send({customer: prescription, message: 'updated'});
    }).catch(function () {
        res.status(400).send({message:'Request Failed'});
    });
});

app.delete('/Prescription/:id', function (req, res) {
    PrescriptionSchema.remove({_id: req.params.id}).then(function () {
        res.status(200).send({message:'deleted'});
    }).catch(function () {
        res.status(400).send({message:'Request Failed'});
    });
});

// API for Dialog Payment Gateway

app.post('/Dialog', function (req, res) {
    if(!req.body) {
        console.log('Invalid Data.Try Again..!');
        return;
    }
    const dialog = new DialogSchema({
        amount:req.body.amount,
        phoneNo:req.body.phoneNo,
        date:new Date()
    });

    const payment = new PaymentSchema({
        amount:req.body.amount,
        type:req.body.type,
        date:new Date(),
        userid:req.body.userId
    });

    if(req.body.pin === '2596') {
        dialog.save().then(function () {
            payment.save().then(function () {
                res.status(200).send({message:'Your Payment is Successfully Completed..!'});
            }).catch(function () {
                res.status(400).send({message:'Request Failed'});
            });



        }).catch(function () {
            res.status(400).send({message:'Request Failed'});
        });
    }

    else res.status(400).send({message:'Request Failed'});


});

// API for Sampath Payment Gateway

app.post('/Sampath', function (req, res) {
    if(!req.body) {
        console.log('Invalid Data.Try Again..!');
        return;
    }
    const sampath = new SampathSchema({
        amount:req.body.amount,
        holdersName:req.body.holdersName,
        creditCardNo:req.body.creditCardNo,
        date:new Date(),
    });

    const payment = new PaymentSchema({
        amount:req.body.amount,
        type:req.body.type,
        date:new Date(),
        userid:req.body.userId
    });

    if(req.body.cvc === '1748') {
        sampath.save().then(function () {
            payment.save().then(function () {
                res.status(200).send({data:payment,message:'Your Payment is Successfully Completed..!'});
            }).catch(function () {
                res.status(400).send({message:'Request Failed'});
            });


        }).catch(function () {
            res.status(400).send({message:'Request Failed'});
        });
    }

    else res.status(400).send({message:'Request Failed'});


});

// API for Payment

app.get('/Payment',function (req,res) {
    PaymentSchema.find().exec().then(function (data) {
        res.status(200).send(data);
    }).catch(function (err) {
        console.log(err);
    })
});
