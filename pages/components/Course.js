import React from 'react'
import { ExternalLink } from 'react-feather'

const isNewCourse = date => {
  const courseDate = new Date(date).getTime()
  const twoDaysAgo = new Date().getTime()

  return twoDaysAgo - courseDate < (60 * 60 * 1000 * 24 * 2)
}

function Course({
  data: {
    createdAt,
    title,
    excerpt,
    author,
    videoUrl,
  },
}) {
  const avatar = `https://images.weserv.nl/?url=https://unavatar.now.sh/twitter/${author.twitter}&w=30`

  return (
    <div className="resources-list__item">
      {createdAt && isNewCourse(createdAt) && (
        <div className="resources-list__item--new">
          NEW
        </div>
      )}
      <div className="resources-list__item--title">
        {title}
      </div>

      <div className="resources-list__item--info">
        {author.twitter ? (
          <>
            <img src={avatar} />
            <a href={`https://twitter.com/${author.twitter}`} target="_blank">
              {author.name}
            </a>
          </>
        ) : author.name}
      </div>

      <div className="resources-list__item--description">
        {excerpt}
      </div>

      <video
        style={{ width: '100%', marginTop: 30, borderRadius: 6 }}
        poster="/static/twitter-card.png"
        controls
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

Course.defaultProps = {
  data: {
    author: {},
  },
}

export default Course
