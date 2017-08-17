import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import { AppContainer } from 'react-hot-loader'

ReactDOM.render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.body.appendChild(document.createElement('div'))
)

if (module.hot) {
    module.hot.accept('./Root', () => {
        const NextApp = require('./Root').default
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
        document.getElementById('root')
        )
    })
}