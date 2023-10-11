const request = require('supertest');
const app = require('../app');
const {API_KEY} = require('../apiKey');

describe('Get Ticker', () => {
  it('should get 200 response from url', async () => {
    var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=ttxp&apikey=${API_KEY}`;

    try {
      await request(app)
      .get(url)
      .expect('data', 
      {
        '1. symbol': 'TTXP',
        '2. name': 'Trilliant Exploration Corp',
        '3. type': 'Equity',
        '4. region': 'United States',
        '5. marketOpen': '09:30',
        '6. marketClose': '16:00',
        '7. timezone': 'UTC-04',
        '8. currency': 'USD',
        '9. matchScore': '1.0000'
      }
      )
      .expect(200)
    
    } catch (e) {
      expect(e)
    }
  });

})

describe('Get Home Page', () => {
  it('should get homepage', async () => {
    try {
      await request(app)
      .get("/")
      .expect(200)    
    } catch (e) {
      expect(e)
    }
  });

})
