import Processor from '../../api/processor/processor.model';
import feedsummary from '../../api/feedsummary/feedsummary.model';

export function processor() {
  populate();
}

function populate() {
  Processor.find({}, function(err, items) {
    if (err) throw err;

    // Sort Items in Buy/Sell
    // Count items in  CompanyWatch
    // Sort Items in Watchlist
    var position = aggregateValue(items, 'position');
    var companies = aggregateValue(items, 'companies');
    var watchList = aggregateValue(items, 'keywords');
    
    feedsummary.find({}).remove().then(() => {
      storeSummaryValues(position, 'BuySell');
      storeSummaryValues(companies, 'Companies');
      storeSummaryValues(watchList, 'Keywords');
    });
    
  });
}

function storeSummaryValues(collection, category){
  console.log('creating summaries');
  collection.forEach(function(item){
    feedsummary.create({
      name: item.name,
      count: item.count,
      category: category
    });
  });
}

function aggregateValue(collection, column) {
  var lookup = {};
  var result = [];

  for (var item, i = 0; item = collection[i++];) {
    var cat = {};
    cat.name = item[column];
    cat.count = 1;
    if(cat.name.length > 0) {
      if(!(cat.name in lookup)) {
        lookup[cat.name] = cat.count;
        result.push(cat);
      }
      else {
        for(var j=0; j<result.length; j++) {
          if(result[j].name == cat.name) {
            result[j].count++;
          }
        }
      }
    }
  }
  return result;
}
