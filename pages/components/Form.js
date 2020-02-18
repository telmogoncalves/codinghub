import React from 'react'

function Form({ handleTweet, handleMany, tweet, many, setCurrentStep }) {
  return (
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
        onChange={handleMany}
        placeholder="Number of winners"
      />

      <button
        onClick={() => setCurrentStep(2)}
        className="submit-button"
        disabled={!tweet || !many}
      >
        Preview Tweet
      </button>
    </>
  )
}

export default Form
