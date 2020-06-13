import { hot } from 'react-hot-loader'
import React from 'react'

import './global.css'
const styles = require('./Root.css')

function Root() {
    return (
      <div className={styles.container}>
        hello world
      </div>
    )
}

export default hot(module)(Root)
