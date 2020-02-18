import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { Row, Col } from 'react-flexbox-grid'

function TweetPreview({ tweet, setCurrentStep, fetchRetweets, darkMode }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <br />

      <TwitterTweetEmbed
        tweetId={tweet}
        placeholder={(
          <div style={{ margin: '35px 0' }}>
            Loading Tweet ...
          </div>
        )}
        options={{
          theme: darkMode ? 'dark' : ''
        }}
      />

      <Row>
        <Col lg={6}>
          <button className="cancel-button" onClick={() => setCurrentStep(1)}>
            No, get me back
          </button>
        </Col>

        <Col lg={6}>
          <button className="submit-button" onClick={() => fetchRetweets()}>
            This is the Tweet 👍
          </button>
        </Col>
      </Row>
    </div>
  )
}

export default TweetPreview
