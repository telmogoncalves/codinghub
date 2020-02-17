import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Confetti from 'react-confetti'
import { TwitterTweetEmbed } from 'react-twitter-embed'

import '../styles/base.scss'
import '../styles/homepage.scss'

import Layout from './components/Layout'

const getRnd = (a, n) => a.sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, n)

function Homepage({ configData }) {
  // 1229381293017792512
  const [tweet, setTweet] = useState()
  const [many, setMany] = useState()
  const [winners, setWinners] = useState()
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [mounted, setMounted] = useState(false)
  const handleTweet = e => setTweet(e.target.value)
  const handleWinners = e => setMany(e.target.value)
  const getUsers = data => data.map(({ user }) => user)
  const redrawWinners = () => {
    setTweet()
    setMany()
    setWinners()
    setConfirm(false)
  }

  const fetchRetweets = async () => {
    setLoading(true)

    fetch(`https://repickr-api.now.sh/${tweet}`)
      .then(res => res.json())
      .then(result => {
        const users = getUsers(result)
        const winners = getRnd(users, many)

        setWinners(winners)
        setLoading(false)
      })
  }

  useEffect(() => {
    setDarkMode(localStorage.getItem('DARK_MODE') === 'true')
    setMounted(true)
  }, [])

  if (!mounted) return <div />

  return (
    <>
      {winners && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          opacity={.4}
          recycle={false}
        />
      )}

      <Layout configData={configData}>
        <Row>
          <Col md={6} mdOffset={3}>
            {!loading && !winners && tweet && confirm && (
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
                    <button className="cancel-button" onClick={() => redrawWinners(false)}>
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
            )}

            {!loading && winners && (
              <>
                <Row center="md">
                  {winners.map(({ id, profile_image_url, screen_name }) => (
                    <Col md={6} key={id}>
                      <div className="winner-container">
                        <img src={profile_image_url} />

                        <div className="username">
                          @{screen_name}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>

                <Row>
                  <Col md={6} mdOffset={3}>
                    <button className="submit-button" onClick={() => redrawWinners()}>
                      Redraw
                    </button>
                  </Col>
                </Row>
              </>
            )}

            {!loading && !winners && !confirm && (
              <>
                <br />
                <br />

                <input
                  className="input"
                  type="text"
                  onChange={handleTweet}
                  placeholder="ID of the Tweet"
                />

                <input
                  className="input"
                  type="number"
                  onChange={handleWinners}
                  placeholder="Number of winners"
                />

                <button
                  onClick={() => setConfirm(true)}
                  className="submit-button"
                  disabled={!tweet || !many}
                >
                  Preview Tweet
                </button>
              </>
            )}

            {loading && (
              <div className="loading">Fetching data, please wait ...</div>
            )}
          </Col>
        </Row>
      </Layout>
    </>
  )
}

Homepage.getInitialProps = async function() {
  const configData = await import(`./data/config.json`)

  return { configData }
}

export default Homepage
