import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

function Winners({ winners, totalRetweets, redrawWinners }) {
  return (
    <>
      <Row center="md">
        {winners.map(({ id, avatar, username }) => (
          <Col md={6} key={id}>
            <div className="winner-container">
              <img src={avatar} />

              <div className="username">
                @{username}
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
  )
}

export default Winners
