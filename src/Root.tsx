import { hot } from 'react-hot-loader'
import React from 'react'

const styles = require('./Root.css')

function Root() {
    return (
      <div className={styles.container}>
        hello world
      </div>
    )
}

export default hot(Root)
