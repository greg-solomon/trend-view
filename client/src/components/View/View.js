import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import styled from 'styled-components';
import Tweet from './Tweet';
import Trends from './Trends';
import ErrorPage from '../ErrorPage';
import Loading from '../Loading';
import ViewHead from './ViewHead';
import PropTypes from 'prop-types';

function sortTweets(trends) {
  const mappedTrendToTweets = [];

  trends.forEach(trend => {
    trend.tweets.forEach(tweet => {
      mappedTrendToTweets.push({
        ...tweet,
        trend: trend.name,
        interactions: tweet.favorite_count + tweet.retweet_count
      });
    });
  });

  const sortedTweets = mappedTrendToTweets.sort((a, b) =>
    a.interactions < b.interactions ? 1 : -1
  );

  return sortedTweets;
}

function findDate(timestamps, id) {
  const { date } = timestamps.find(ts => ts.id === id);
  return moment(date).format('MMMM Do YYYY, h:mm A');
}

const View = ({ match }) => {
  const { id } = match.params;

  const TRENDS = gql`
        {
            trendsByTime(id: "${id}") {
                name
                url
				tweet_volume
				timestamps {
					id
					date
				}
                tweets {
                    created_at
                    text
                    media_url
                    url
                    user
                    user_display_pic
                    name
                    retweet_count
                    favorite_count
					created_at
					id
                }
            }
        }
	`;

  const { loading, error, data } = useQuery(TRENDS);
  if (loading) return <Loading message='Fetching trends...' />;

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (data) {
    const date = findDate(data.trendsByTime[0].timestamps, id);
    const filtered = data.trendsByTime.filter(
      trend => trend.tweets.length !== 0
    );
    const sorted = sortTweets(filtered);
    return (
      <ViewWrapper>
        <ViewHead date={date} data={data} />
        <Trends trends={filtered} />
        <TweetsWrapper>
          {sorted.map(tweet => (
            <Tweet
              image={tweet.media_url}
              text={tweet.text}
              url={tweet.url}
              trend={tweet.trend}
              favorites={tweet.favorite_count}
              retweets={tweet.retweet_count}
              date={tweet.created_at}
              id={tweet.id}
              key={tweet.id}
            />
          ))}
        </TweetsWrapper>
      </ViewWrapper>
    );
  }
};

const TweetsWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px;
  align-items: center;
  justify-content: space-around;
  background-color: transparent;
`;

const ViewWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: transparent;
`;

View.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequird,
    params: PropTypes.shape({ id: PropTypes.string.isRequired })
  }).isRequired
};
export default View;
