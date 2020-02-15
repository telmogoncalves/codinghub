import React, { useState } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Router from 'next/router'
import withGA from 'next-ga'

import '../styles/base.scss'
import '../styles/homepage.scss'
import { ANALYTICS_ID } from '../constants/GoogleConstants'

import Layout from './components/Layout'
import Course from './components/Course'
import Tags from './components/Tags'

const shuffleArray = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);

function Homepage({ configData, resourcesData }) {
  const [filterTag, setFilterTag] = useState()

  const data = filterTag ? resourcesData.filter(
    course =>
      course.tags.includes(filterTag)
  ) : resourcesData

  return (
    <Layout configData={configData}>
      {resourcesData && (
        <>
          <Row>
            <Col md={12}>
              <Tags data={resourcesData} filterTag={filterTag} setTag={setFilterTag} />
            </Col>
          </Row>

          <div className="resources-list">
            <Row>
              {data.map(data => (
                <Col md={6} key={data.title} style={{ marginBottom: 20 }}>
                  <Course data={data} />
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </Layout>
  )
}

Homepage.getInitialProps = async function() {
  const configData = await import(`./data/config.json`)
  const resourcesData = await import(`../content/courses.js`)

  return { configData, resourcesData: shuffleArray(resourcesData.default) }
}

export default withGA(ANALYTICS_ID, Router)(Homepage)
