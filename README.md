# bank-api
this is a basic but functional bank api which enables users to make transactions and get their accout balance and details.

TransferService
Transactions
POSTtransfer
localhost:3000/transfer
/Transfer

This enables users to post a transfer request using the following inputs:

{ "senderAccount": "0000000003", "receiverAccount": "0000000001", "amount": "95", "transferDescription": "transfer description"}

On posting, it returns the account details of both the sender and the receiver. It also returns the details of the transaction.

Sample Output:

{ "message": "successful", "newTransaction": { "reference": "0000000003-2hpdi1iwnkyatvxpr-0000000001", "amount": 80, "receiverAccount": "0000000001", "senderAccount": "0000000003", "createdAt": "2022-01-12T00:52:21.999Z", "transferDescription": "transfer description", "_id": "61de2646c56e6e65c901c734", "v": 0 }, "sender": { "_id": "61de1c7e47cd12c2eb802701", "accountNo": "0000000003", "balance": "4515", "createdAt": "2022-01-12T00:10:38.283Z", "userId": "61de1c7e47cd12c2eb8026fe", "v": 0, "updatedAt": "2022-01-12T00:51:58.143Z" }, "recepient": { "_id": "61de182136c5b39fe4524151", "accountNo": "0000000001", "balance": "5245", "createdAt": "2022-01-11T23:52:01.442Z", "userId": "61de182136c5b39fe452414e", "__v": 0, "updatedAt": "2022-01-12T00:51:58.143Z" }}


GETuser-transactions
localhost:3000/transaction/:accountNumber
/transactions/:accountNo

This route takes in the transactions as the params and returns all the transactions made by a particular user.


GETuser-transactions(DEBIT)
localhost:3000/transaction/debit/:accountNumber
/transaction/debit/:accountNo

this route also takes in the accountNo as the params and returns all debit transactions made by the user with the specified account no.


GETuser-transactions (CREDIT)
localhost:3000/transaction/credit/:accountNumber
/transaction/credit/:accountNo

this route also takes in the accountNo as the params and returns all credit transactions made by the user with the specified account no


Balances
GETaccount-balance
local:host:3000/balance/:accountNumber
/balance/account/:accountNo

This route returns the account details of a particular user. It takes in the account no of that user as the params. The userId refers to the id of the user created on registration

{ "message": "successful", "accountBalance": { "_id": "61de182136c5b39fe4524151", "accountNo": "0000000001", "balance": "5000", "createdAt": "2022-01-11T23:52:01.442Z", "userId": "61de182136c5b39fe452414e", "__v": 0 }}


curl --location --request GET 'local:host:3000/balance/:accountNumber'
GETuser-balance
localhost:3000/balance/:userId
/balance/user/:userId

This route returns the account details of a particular user. It takes in the id of that user as the params. The userId refers to the id of the user created on registration

Sample output:

{ "message": "successful", "accountBalance": { "_id": "61de182136c5b39fe4524151", "accountNo": "0000000001", "balance": "5000", "createdAt": "2022-01-11T23:52:01.442Z", "userId": "61de182136c5b39fe452414e", "__v": 0 }}


GETall-account-balance
localhost:3000/balance
/balance

This route returns the account details of all users.

Sample output:

{ "_id": "61de19569edd19c907388deb", "accountNo": "0000000002", "balance": "5000", "createdAt": "2022-01-11T23:57:10.618Z", "userId": "61de19569edd19c907388de8", "__v": 0 }



Example Request
all-account-balance
curl --location --request GET 'localhost:3000/balance'
Users
POSTsignup
localhost:3000/signup
/signup

This routes creates a new user with automatically generated account no and assigns a balance of 5000NGN on signup.

Sample Input:

{ "firstName": "Sammmy", "lastName": "Baddo", "DOB": "21/01/1993", "email": "sammybaddo@gmail.com", "phoneNo": "08130553102", "password": "123456"}

Sample Output:

{ "message": "success! You have received a balance of 5000NGN", "userDetails": { "firstName": "Sammmy", "lastName": "Baddo", "DOB": "21/01/1993", "email": "sammybaddo@gmail.com", "phoneNo": "08130553102", "_id": "61de1cc247cd12c2eb802716" }, "accountBalance": { "accountNo": "0000000007", "balance": "5000", "createdAt": "2022-01-12T00:11:46.595Z", "userId": "61de1cc247cd12c2eb802716" }}

BODYraw
{
    "firstName": "Sam",
    "lastName": "Aju",
    "DOB": "21/01/1993",
    "email": "samajul@gmail.com",
    "phoneNo": "08130553102",
    "password": "123456"
}


POSTlogin
localhost:3000/login
/login

Performs basic login verification with email and password.

