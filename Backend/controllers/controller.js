//might need to import mysql in this folder. IDK
const db = require('../database/db');
let theReturn;
// list of accounts on main page
const accounts = (req, res) => {
    console.log("request");
    let resultz;

    // database call and return and send
    db.query('SELECT * FROM accounts', function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });


};

// list of transactions on account page
const transactions = (req, res) => {
    const id = req.params.accountID;
    console.log(id);

    const sql = 'SELECT * FROM transactions WHERE ToAccountID = ? OR FromAccountID = ?'
    // database call and return and send

    db.query(sql, [id, id], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });



};

// account detail page 
const accountDetail = (req, res) => {
    console.log("request");
    // database call and return and send
    res.send('hello world');
};

// transaction details page
const transactionDetails = (req, res) => {
    const id = req.params.transactionID;
    console.log(id);
    //const sql = 'SELECT * FROM transactions WHERE TransactionID = ? JOIN transactiontype ON transactions.transactiontype = transactiontype.transactionid';
    const sql = 'SELECT * FROM transactions WHERE TransactionID = ?'
    // database call and return and send

    db.query(sql, [id], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });


    //res.send('testing')



};

// button on main page of transaction and deposit
const createTransaction = (req, res) => {
    let returning;
    let data = req.body;

    if (isNaN(data.fromAccountID)) {

        const sql = 'INSERT INTO transactions(TransactionAmmount, ToAccountID, TransactionType) VALUES (?, ?, ?);'

        db.query(sql, [parseInt(data.transactionAmmount), parseInt(data.toAccountID), parseInt(data.transactionType)], function (err, result, fields) {
            if (err) throw err;
            /***********************************
        *
        *
        *    
        *
        *
        *
        */
        
        var stuff = '';
        console.log('amount');
        console.log(data.transactionAmmount);
        const sqla = 'SELECT * FROM accounts WHERE AccountID = ?'

    

    
        db.query(sqla, [data.toAccountID], function (err, results, fields) {
        if (err) throw err;

            /*
            Object.keys(result).forEach(function(key) {
                let row = result[key];
                console.log('row amount');
                console.log(row.AccountAmount)
                theReturn = row.AccountAmount;
            
            
            });*/
            console.log('returning ammount');
            console.log(results);
            returning = results[0].AccountAmount;
            //console.log(returning + ' returning');
            let newAmount = parseInt(returning) + parseInt(data.transactionAmmount);
            //console.log(newAmount);
            const sqlb = 'UPDATE accounts SET AccountAmount = ? WHERE AccountID = ?'
            db.query(sqlb, [newAmount, data.toAccountID], function (err, result, fields) {
                if (err) throw err;
                    console.log(result)
                    console.log(newAmount)
                    console.log(data.toAccountID)
                    res.json(result);
                });

                
        });
        });
        
        

    }
    console.log(data);
    // database call and return and send














    if (!isNaN(data.fromAccountID)) {
        //if(getAccountBalance(data.fromAccountID, data.transactionAmmount)){
            const sqln = 'SELECT * FROM accounts WHERE AccountID = ?'

            
        
            
                db.query(sqln, [data.fromAccountID], function (err, resultn, fields) {
                if (err) throw err;
        
                /*
                Object.keys(result).forEach(function(key) {
                    let row = result[key];
                    console.log('row amount');
                    console.log(row.AccountAmount)
                    theReturn = row.AccountAmount;
                
                
                });*/
                
                let returningn = resultn[0].AccountAmount;
                if(returningn >= data.transactionAmmount){


        const sql = 'INSERT INTO transactions(TransactionAmmount, FromAccountID, ToAccountID, TransactionType) VALUES (?, ?, ?, ?);'



        db.query(sql, [parseInt(data.transactionAmmount), parseInt(data.fromAccountID), parseInt(data.toAccountID), parseInt(data.transactionType)], function (err, result, fields) {
            if (err) throw err;
            const sqlj = 'SELECT * FROM accounts WHERE AccountID = ?'

        

    
            db.query(sqlj, [data.toAccountID], function (err, resultj, fields) {
                if (err) throw err;

                /*
                Object.keys(result).forEach(function(key) {
                    let row = result[key];
                    console.log('row amount');
                    console.log(row.AccountAmount)
                    theReturn = row.AccountAmount;
                
                
                });*/
                console.log(result);
                let returningj = resultj[0].AccountAmount;
                const sqlk = 'UPDATE accounts SET AccountAmount = ? WHERE AccountID = ?'
                

                let newAmountk = parseInt(returningj) + parseInt(data.transactionAmmount);

                //console.log(newAmount);
                db.query(sqlk, [newAmountk, data.toAccountID], function (err, resultk, fields) {
                    if (err) throw err;

                    const sqll = 'SELECT * FROM accounts WHERE AccountID = ?'

    

    
                    db.query(sqll, [data.fromAccountID], function (err, resultl, fields) {
                    if (err) throw err;

                        /*
                        Object.keys(result).forEach(function(key) {
                            let row = result[key];
                            console.log('row amount');
                            console.log(row.AccountAmount)
                            theReturn = row.AccountAmount;
                        
                        
                        });*/
                        let returningl = resultl[0].AccountAmount;

                        let newAmountm =  parseInt(returningl) - parseInt(data.transactionAmmount);
                        //update from account
                        const sqlm = 'UPDATE accounts SET AccountAmount = ? WHERE AccountID = ?'

                        

                        db.query(sqlm, [newAmountm, data.fromAccountID], function (err, resultm, fields) {
                            if (err) throw err;
                            
                            res.json(resultm);
                        });

                    })
                });
                
                
        
            })
             

    });
    }else{
        res.json(resultn);
    }
    })
    }
//endones

};










const updateBalance = (toAccountId, amount) => {/***********************************
    *
    *
    * 
    *
    *
    *
    */
    const sql = 'UPDATE accounts SET AccountAmount = ? WHERE AccountID = ?'
    var stuff = '';
    console.log('amount');
    console.log(amount);

    let newAmount = getBalance(toAccountId, (results) => {stuff = results}) + amount;

    //console.log(newAmount);
    db.query(sql, [newAmount, toAccountId], function (err, result, fields) {
        if (err) throw err;


    });
}

const updateFromBalance = (fromAccountId, amount) => {
    const sql = 'UPDATE accounts SET AccountAmount = ? WHERE AccountID = ?'

    let newAmount = getBalance(fromAccountId) - amount;

    db.query(sql, [newAmount, fromAccountId], function (err, result, fields) {
        if (err) throw err;
        console.log(result);

    });
}

const getBalance = (tableId, callback) => {
    const sql = 'SELECT * FROM accounts WHERE AccountID = ?'

    var returning;

    
        db.query(sql, [tableId], function (err, result, fields) {
        if (err) throw err;

        /*
        Object.keys(result).forEach(function(key) {
            let row = result[key];
            console.log('row amount');
            console.log(row.AccountAmount)
            theReturn = row.AccountAmount;
        
        
        });*/
        console.log(result);
        //returning = result[0].AccountAmount;
        //console.log(returning + ' returning');
        if(result === undefined){
            reject(new Error("Error result is undefined"));
        }else{
            resolve(result);
        }
    });
    //return returning;
    //return callback(returning);
    //return 100;
}





module.exports = {
    accounts,
    transactions,
    accountDetail,
    transactionDetails,
    createTransaction
}