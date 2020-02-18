import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Confetti from 'react-confetti'

import '../styles/base.scss'
import '../styles/homepage.scss'

import Layout from './components/Layout'
import Form from './components/Form'
import TweetPreview from './components/TweetPreview'
import Winners from './components/Winners'

const getRnd = (a, n) => a.sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, n)
// const API_ENDPOINT = `https://repickr-api.now.sh`
const API_ENDPOINT = `http://localhost:8000`

function Homepage({ configData }) {
  const [currentStep, setCurrentStep] = useState(2)
  const [tweet, setTweet] = useState('1229381293017792512')
  const [many, setMany] = useState(1)
  // const [currentStep, setCurrentStep] = useState(1)
  // const [tweet, setTweet] = useState()
  // const [many, setMany] = useState()
  const [winners, setWinners] = useState()
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [totalRetweets, setTotalRetweets] = useState()
  const handleTweet = e => setTweet(e.target.value)
  const handleMany = e => setMany(e.target.value)
  const redrawWinners = () => {
    fetchRetweets()
  }

  const fetchRetweets = async () => {
    setLoading(true)

    fetch(`${API_ENDPOINT}/${tweet}`)
      .then(res => res.json())
      .then(result => {
        setTotalRetweets(result.length)
        const winners = getRnd(result, many)

        setWinners(winners)
        setCurrentStep(3)
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
      {currentStep === 3 && (
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
            {!loading && currentStep === 1 && (
              <Form
                setCurrentStep={setCurrentStep}
                handleTweet={handleTweet}
                handleMany={handleMany}
                tweet={tweet}
                many={many}
              />
            )}

            {!loading && currentStep === 2 && (
              <TweetPreview
                tweet={tweet}
                setCurrentStep={setCurrentStep}
                fetchRetweets={fetchRetweets}
                darkMode={darkMode}
              />
            )}

            {!loading && currentStep === 3 && (
              <Winners
                totalRetweets={totalRetweets}
                winners={winners}
                redrawWinners={redrawWinners}
              />
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
