import React, { useState, useEffect } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Head from 'next/head'
import { Moon, Sun } from 'react-feather'

function Layout({
  configData: {
    title,
    description,
  },
  children,
}) {
  const [darkMode, setDarkMode] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setDarkMode(localStorage.getItem('DARK_MODE') === 'true')
    setMounted(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('DARK_MODE', darkMode)
  }, [darkMode])

  if (!mounted) return <div />

  if (typeof document !== 'undefined') {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }

  return (
    <div className={`theme--${darkMode ? `dark` : 'light'}`}>
      <Head>
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
        <meta name='apple-mobile-web-app-capable' content='yes' />

        <title>{title} ∙ Curated list of awesome tech videos</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@telmo" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/static/twitter-card.png" />
      </Head>

      <div className="theme-switch" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun /> : <Moon />}
      </div>

      <div className="logo">
        ⧩
      </div>

      <Grid>
        <Row>
          <Col md={8}>
            <div className="homepage">
              <div className="homepage__title">
                <div dangerouslySetInnerHTML={{ __html: `{coding<span>hub</span>}` }} />
              </div>

              <div className="homepage__description">
                <span>
                  {description}
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {children}
      </Grid>

      <footer>
        Made by <a href="https://twitter.com/telmo" target="_blank">Telmo Goncalves</a> with {' '}
        <a href="https://nextjs.org/" target="_blank">NextJS</a> {' '}
        &copy; {new Date().getFullYear()}

        <br />

        Hosted on <a href="http://zeit.co/" target="_blank">Zeit</a>.
        Check the <a href="http://github.com/telmogoncalves/codinghub" target="_blank">source code</a>.
      </footer>
    </div>
  )
}

Layout.defaultProps = {
  configData: {},
}

export default Layout
