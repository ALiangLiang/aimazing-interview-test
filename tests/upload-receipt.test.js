const fs = require('fs')
const LambdaTester = require( 'lambda-tester' );
 
const myHandler = require( '../funcions/upload-receipt' ).handler;
const { findLinesUntil, parseDateTimeLine } = require('../funcions/upload-receipt/helpers')
 
describe( 'handler', function() {
    it( 'test helper findLinesUntil', async function() {
      const lines = [
        'foo',
        'bar',
        '',
        'qwe',
        '',
        'asd',
      ]
      expect(findLinesUntil(lines, '')).toEqual([
        'foo',
        'bar',
      ])
    });

    it( 'test', async function() {
      await LambdaTester( myHandler )
        .event((eventMocks) => eventMocks.apiGateway()
          .path( '/receipt' )
          .method( 'POST' )
          .headers({
            'Content-Type': 'multipart/form-data; boundary=---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k',
          })
          .body([
              '-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k',
              'Content-Disposition: form-data; name="receipt"; filename="receipt.txt"',
              '',
              fs.readFileSync('./tests/assets/sample_receipt_1.txt', { encoding: 'utf-8' }),
              '-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k',
              'Content-Disposition: form-data; name="tag";',
              '',
              'food',
              '-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--'
            ].join('\r\n'))
          .build())
        .expectResult();
    });
});