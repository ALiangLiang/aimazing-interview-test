const assert = require('assert')
const LambdaTester = require( 'lambda-tester' );
 
const myHandler = require( '../funcions/read-receipt' ).handler;
 
describe( 'handler', function() {
  it( 'test fetch all receipts', async function() {
    await LambdaTester( myHandler )
      .event((eventMocks) => eventMocks.apiGateway()
        .path('/receipt')
        .method('GET')
        .build())
      .expectResult();
  })

  it( 'test fetch single receipts', async function() {
    await LambdaTester( myHandler )
      .event((eventMocks) => eventMocks.apiGateway()
        .path('/receipt')
        .method('GET')
        .queryStringParameter('tag', 'house')
        .build())
      .expectResult();
  });

  it( 'test fetch single receipts with unknown tag', async function() {
    await LambdaTester( myHandler )
      .event((eventMocks) => eventMocks.apiGateway()
        .path('/receipt')
        .method('GET')
        .queryStringParameter('tag', 'unknown')
        .build())
      .expectResult((r) => assert.strictEqual(r.statusCode, 404));
  });
});