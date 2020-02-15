import React from 'react'

function Tags({ data, filterTag, setTag, }) {
  const getTags = () => {
    let tags = new Array()

    // All tags
    data.map(data => tags.push(data.tags))

    // Flat + Unique
    return [...new Set([].concat(...tags))].sort()
  }

  return (
    <div className="available-tags">
      <div
        className={`available-tags__tag ${!filterTag && 'active'}`}
        onClick={() => setTag()}
      >
        All
      </div>
      {getTags().map(tag => (
        <div
          className={`available-tags__tag ${filterTag === tag && 'active'}`}
          onClick={() => setTag(tag)}
          key={tag}
        >
          {tag}
        </div>
      ))}
    </div>
  )
}

Tags.defaultProps = {
  data: [],
}

export default Tags

