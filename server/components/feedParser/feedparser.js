import Story from '../../api/story/story.model';

/* --- URLs ---
- SOURCE: http://www.marketwatch.com/rss/
http://feeds.marketwatch.com/marketwatch/marketpulse
http://feeds.marketwatch.com/marketwatch/realtimeheadlines/

http://articlefeeds.nasdaq.com/nasdaq/categories?category=Stocks
http://articlefeeds.nasdaq.com/nasdaq/categories?category=Technology


- SOURCE: http://www.cnbc.com/rss-feeds/
http://www.cnbc.com/id/19854910/device/rss/rss.html //Technology
http://www.cnbc.com/id/15839135/device/rss/rss.html //Earnings
http://www.cnbc.com/id/10001147/device/rss/rss.html //Business
http://www.cnbc.com/id/100727362/device/rss/rss.html //World News
http://www.cnbc.com/id/100003114/device/rss/rss.html //Top News
http://www.cnbc.com/id/19836768/device/rss/rss.html //Energy
http://www.cnbc.com/id/10000115/device/rss/rss.html //Real Estate
http://www.cnbc.com/id/20409666/device/rss/rss.html //Market Insider
http://www.cnbc.com/id/10000113/device/rss/rss.html // Politics

- SOURCE: http://www.reuters.com/tools/rss
http://feeds.reuters.com/reuters/businessNews
http://feeds.reuters.com/news/wealth
http://feeds.reuters.com/Reuters/PoliticsNews
http://feeds.reuters.com/reuters/topNews
http://feeds.reuters.com/Reuters/domesticNews
http://feeds.reuters.com/Reuters/worldNews
http://feeds.reuters.com/reuters/hotStocksNews
http://feeds.reuters.com/reuters/mergersNews
http://feeds.reuters.com/reuters/governmentfilingsNews

http://feeds.reuters.com/reuters/basicmaterialsNews
http://feeds.reuters.com/reuters/cyclicalconsumergoodsNews
http://feeds.reuters.com/reuters/USenergyNews
http://feeds.reuters.com/reuters/environment
http://feeds.reuters.com/reuters/financialsNews
http://feeds.reuters.com/reuters/industrialsNews
http://feeds.reuters.com/reuters/technologysectorNews
http://feeds.reuters.com/reuters/utilitiesNews

- SOURCE: https://www.investing.com/webmaster-tools/rss
https://www.investing.com/rss/market_overview.rss
https://www.investing.com/rss/news_285.rss //Popular News
https://www.investing.com/rss/news_288.rss //Tech

http://rss.cnn.com/rss/money_latest.rss
http://rss.cnn.com/rss/money_markets.rss
http://feeds2.feedburner.com/BusinessRss
http://feeds2.feedburner.com/InvestingRss
http://feeds2.feedburner.com/EconomyRss

- SOURCE: http://www.investopedia.com/rss/
http://www.investopedia.com/feedbuilder/feed/getFeed?feedName=rss_headline
http://www.investopedia.com/feedbuilder/feed/getFeed?feedName=rss_stock_analysis

- SOURCE: https://biz.yahoo.com/ic/index.html || https://biz.yahoo.com/ic/ind_index.html
http://finance.yahoo.com/rss/AerospaceDefenseMajorDiversified
http://finance.yahoo.com/rss/BusinessSoftwareServices
http://finance.yahoo.com/rss/MajorIntegratedOilGas


- TICKER NEWS LOOKUP: http://finance.yahoo.com/rss/industry?s=ticker(s)
  EX: http://finance.yahoo.com/rss/headline?s=yhoo,msft,tivo

*/

var FeedParser = require('feedparser');
var Promise    = require('bluebird');
var request = require('request'); // for fetching the feed
var feedparser = new FeedParser();
var processFeeder = require('../processor/newsIdentifier')


export function initScan() {
  console.log('-> Begin fetching feeds');
  const fetch = (url) => {
    console.log('...' + url);
    return new Promise((resolve, reject) => {
      if (!url) { return reject(new Error(`Bad URL (url: ${url}`)); }

      const feedparser = new FeedParser(),
            items = [];

      feedparser.on('error', (e) => {
        return reject(e);
      }).on('readable', () => {
        // This is where the action is!
        var item;

        //Story.find({}).remove().then(() => {  
          while (item = feedparser.read()) {     
            if (typeof item.title !== 'undefined' && item.title) {        
              Story.update(
                {
                  title: item.title
                },
                {
                  title: item.title,
                  summary: item.summary,
                  link: item.link,
                  pubdate: item.pubdate
                },
                {
                  upsert:true
                },
                function(err,data) {
                  if (err) console.log(err);
                });
            }
          }
        //});
      }).on('end', () => {
        resolve({
          meta: feedparser.meta,
          records: items
        });
      });

      request({
        method: 'GET',
        url: url
      }, (e, res, body) => {
        if (e) {
          return reject(e);
        }

        if (res.statusCode != 200) {
          return reject(new Error(`Bad status code (status: ${res.statusCode}, url: ${url})`));
        }

        feedparser.end(body);
      });
    });
  };

  Promise.map([
    'http://articlefeeds.nasdaq.com/nasdaq/categories?category=Stocks',
    'http://feeds.marketwatch.com/marketwatch/marketpulse',
    'http://feeds.marketwatch.com/marketwatch/realtimeheadlines/',
    'http://www.cnbc.com/id/19854910/device/rss/rss.html',
    'http://www.cnbc.com/id/15839135/device/rss/rss.html',
    'http://www.cnbc.com/id/10001147/device/rss/rss.html',
    'http://www.cnbc.com/id/100727362/device/rss/rss.html',
    'http://www.cnbc.com/id/100003114/device/rss/rss.html',
    'http://www.cnbc.com/id/19836768/device/rss/rss.html',
    'http://www.cnbc.com/id/10000115/device/rss/rss.html',
    'http://www.cnbc.com/id/20409666/device/rss/rss.html',
    'http://www.cnbc.com/id/10000113/device/rss/rss.html',
    'http://feeds.reuters.com/reuters/businessNews',
    'http://feeds.reuters.com/news/wealth',
    'http://feeds.reuters.com/Reuters/PoliticsNews',
    'http://feeds.reuters.com/reuters/topNews',
    'http://feeds.reuters.com/Reuters/domesticNews',
    'http://feeds.reuters.com/Reuters/worldNews',
    'http://feeds.reuters.com/reuters/hotStocksNews',
    'http://feeds.reuters.com/reuters/mergersNews',
    'http://feeds.reuters.com/reuters/governmentfilingsNews',
    'https://www.investing.com/rss/market_overview.rss',
    'http://rss.cnn.com/rss/money_latest.rss',
    'http://www.investopedia.com/feedbuilder/feed/getFeed?feedName=rss_headline',
    'http://feeds2.feedburner.com/businessinsider',
    'http://www.businessinsider.com/trending/rss',
    'http://www.businessinsider.com/moneygame/rss'
  ], (url) => fetch(url), {concurrency: 4}) // note that concurrency limit
  .then((feeds) => {
    console.log('-> End fetching feeds');
    processFeeder.processor();
  });
}
