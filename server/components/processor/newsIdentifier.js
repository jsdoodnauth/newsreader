import Story from '../../api/story/story.model';
import Processor from '../../api/processor/processor.model';
import Ratinglookup from '../../api/ratinglookup/ratinglookup.model';
import Companylookup from '../../api/companylookup/companylookup.model';
import Keywordlookup from '../../api/keyword/keyword.model';

var summarizer = require('../processor/summarizer');

export function processor() {
  cleanStoryCollection();
  processStories();
  summarizer.processor();
}

function cleanStoryCollection() {
  var today = new Date(); 
  var targetDate= new Date();
  targetDate.setDate(today.getDate() - 1);
  targetDate.setHours(0);
  targetDate.setMinutes(0);
  targetDate.setSeconds(0);

//  Story.remove({pubdate: {$lte:targetDate}});

  Story.find({}, function(err, stories) {
    stories.forEach(function(story){
      var selectedDate = story.pubdate;
    
      if (Date.parse(targetDate ) <= Date.parse(selectedDate)) {
        //console.log('Within Date limits - ' + targetDate + ' :: ' + selectedDate);
      } else {
        story.remove().then(() => { });
      }
    });
  });
}

function processStories() {
  var promiseRating = Ratinglookup.find({}).exec();
  var promiseCompany = Companylookup.find({}).exec();
  var promiseKeyword = Keywordlookup.find({}).exec();

  promiseRating.then(function(ratingCollection) {
    promiseCompany.then(function(companyCollection) {
      promiseKeyword.then(function(keywordCollection) {
        Story.find({}, function(err, stories) {
          if (err) throw err;

          stories.forEach(function(story){
            var item = story;
            var plainSummary = htmlToPlaintext(item.summary)
            var shortTitle = createShortTitle(item.title);
            var companyList = parseCompanies(shortTitle, companyCollection);
            var buyOrSellCount = findBuyOrSellCount(shortTitle, ratingCollection);
            var buyOrSell = rateBuyOrSell(buyOrSellCount);
            var keywords = parseKeywords(shortTitle, keywordCollection);
            Processor.find({}).remove().then(() => {
              Processor.create({
                title: item.title,
                shorttitle: shortTitle,
                    summary: plainSummary,
                    link: item.link,
                    pubdate: item.pubdate,
                    companies: companyList,
                    position: buyOrSell,
                    positionCount: buyOrSellCount,
                    keywords: keywords
              });
            });
          });
        });
      });
    });
  });
}

function htmlToPlaintext(text) {
  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
}

function removeSpecialCharacters(title) {
  var stringToReplace = title + ' '; //Force 'title' to be a string by appending an extra space
  return stringToReplace.replace(/[`~!@#$%^&*()_|+\-=?;:'',.<>\{\}\[\]\\\/]/gi, ' ').trim();
}

function createShortTitle(title) {
  return removeSpecialCharacters(removeStopWords(title));
}

function rateBuyOrSell(ratingCount) {  
  if (ratingCount > 0) return "Buy";
  else if (ratingCount < 0) return "Sell";
  return "";
}

function findBuyOrSellCount(title, ratingCollection) {  
  var ratingReturn = 0;
  ratingCollection.forEach(function(rating) {
    var padTitle = ' ' + title.toLowerCase() + ' ';
    if (padTitle.indexOf(' ' + rating.name.toLowerCase() + ' ') !== -1) {
      if(rating.rating == 'Buy')  ratingReturn++;
      else if (rating.rating == 'Sell') ratingReturn--;
    }
  });
  return ratingReturn;
}


function parseCompanies(title, companyCollection) {
  var companyReturn = '';
  companyCollection.forEach(function(company) {
    if (title.indexOf(company.name.toLowerCase()) !== -1) {    
      companyReturn += company.symbol + ' ';
      return company.symbol;
    }
  });
  return companyReturn.trim();
}

function parseKeywords(title, keywordCollection) {
  var keywordReturn = '';
  keywordCollection.forEach(function(keyword) {
    var padTitle = ' ' + title.toLowerCase() + ' ';
    if ((title.indexOf(' ' + keyword.name.toLowerCase() + ' ') !== -1) && (keywordReturn.indexOf(keyword.category.toLowerCase()) === -1)) {    
      keywordReturn += keyword.category + ' ';
      return keyword.category;
    }
  });
  return keywordReturn.trim();
}

function removeStopWords(title) {
  var common = getStopWords();
  var wordArr = title.match(/\w+/g),
  commonObj = {},
  uncommonArr = [],
  word, i;

  for (i = 0; i < common.length; i++) {
    commonObj[ common[i].trim() ] = true;
  }

  for (i = 0; i < wordArr.length; i++) {
    word = wordArr[i].trim().toLowerCase();
    if (!commonObj[word]) {
      uncommonArr.push(word);
    }
  }
  return uncommonArr;
}

function getStopWords() {
  return ['a', 'able', 'about', 'across', 'after', 'all', 'almost', 'also', 'am', 'among', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'but', 'by', 'can', 'cannot', 'could', 'dear', 'did', 'do', 'does', 'either', 'else', 'ever', 'every', 'for', 'from', 'get', 'got', 'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his', 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'least', 'let', 'like', 'likely', 'may', 'me', 'might', 'most', 'must', 'my', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or', 'other', 'our', 'own', 'rather', 'said', 'say', 'says', 'she', 'should', 'since', 'so', 'some', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'tis', 'to', 'too', 'twas', 'us', 'wants', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'yet', 'you', 'your', 'ain\'t', 'aren\'t', 'can\'t', 'could\'ve', 'couldn\'t', 'didn\'t', 'doesn\'t', 'don\'t', 'hasn\'t', 'he\'d', 'he\'ll', 'he\'s', 'how\'d', 'how\'ll', 'how\'s', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'isn\'t', 'it\'s', 'might\'ve', 'mightn\'t', 'must\'ve', 'mustn\'t', 'shan\'t', 'she\'d', 'she\'ll', 'she\'s', 'should\'ve', 'shouldn\'t', 'that\'ll', 'that\'s', 'there\'s', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'wasn\'t', 'we\'d', 'we\'ll', 'we\'re', 'weren\'t', 'what\'d', 'what\'s', 'when\'d', 'when\'ll', 'when\'s', 'where\'d', 'where\'ll', 'where\'s', 'who\'d', 'who\'ll', 'who\'s', 'why\'d', 'why\'ll', 'why\'s', 'won\'t', 'would\'ve', 'wouldn\'t', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve'];
}