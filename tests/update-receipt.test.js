const assert = require('assert')
const LambdaTester = require( 'lambda-tester' );
 
const myHandler = require( '../funcions/update-receipt' ).handler;
 
describe('handler', function() {
  it('test', async function() {
    await LambdaTester( myHandler )
      .event((eventMocks) => eventMocks.apiGateway()
        .path('/receipt')
        .method('put')
        .body({
          id: 1,
          tag: 'traffic'
        })
        .build())
      .expectResult();
  })
});