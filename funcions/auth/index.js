'use strict';

const AmazonCognitoIdentity = require("./amazon-cognito-identity.min.js");
const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
const CognitoUser = AmazonCognitoIdentity.CognitoUser;
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

exports.handler = (event, context, callback) => {
  const authenticationData = {
    Username: JSON.parse(event.body).username,
    Password: JSON.parse(event.body).password,
  }
  console.log(authenticationData)
  const authenticationDetails = new AuthenticationDetails(authenticationData)

  const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
  }

  const userPool = new CognitoUserPool(poolData)
  const userData = {
    Username: JSON.parse(event.body).username,
    Pool: userPool
  }

  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log('IdToken: ' + result.getIdToken().getJwtToken())
      callback && callback(null, JSON.stringify(result))
    },
    onFailure: function (err) {
      console.log(err)
      callback && callback(null, err.message)
    }
  })
};