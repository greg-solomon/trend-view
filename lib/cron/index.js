// Trigger CRON functions here
const cron = require('node-cron');
import Timestamp from '../../models/Timestamp';
import { storeTrends, storeTweets } from './twitter';
import Trend from '../../models/Trend';
import { formatDistance, format } from 'date-fns';
cron.schedule('0 * * * *', async () => {
  // create timestamp model
  const ts = new Timestamp({
    date: Date.now()
  });
  // store trends
  await storeTrends(ts);
});

// populate trends with tweets every 15 minutes to ensure no trends are empty
cron.schedule('1 * * * *', async () => {
  const emptyTrends = await Trend.find({ tweets: [] });
  emptyTrends.forEach(trend => storeTweets(trend));
});

// Clean up database
cron.schedule('* */3 * * *', async () => {
  const toDelete = [];
  const emptyTrends = await Trend.find({ tweets: [] });
  const HOUR = 1000 * 60 * 60;
  emptyTrends.forEach(trend => {
    const timeBetween = Date.now() - trend.as_of;

    // if there are no tweets and more than 12 hours has passed,
    //  delete the trend so that we don't include it in our tweet searches and go over rate limits unnecessarily
    if (Math.round(timeBetween / HOUR) > 12) {
      toDelete.push(trend.remove());
      console.log(`${trend.name} removed.`);
    }
  });
  return await Promise.resolve(toDelete);
});

module.exports = cron;
