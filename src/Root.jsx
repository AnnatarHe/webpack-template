import React from 'react'

import { hot } from 'react-hot-loader'
import styles from './Root.css'
const Root = () => {
    return (
      <div className={styles.container}>
        hello world
      </div>
    )
}

export default hot(module)(Root)
