import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'
import 'semantic-ui-css/semantic.min.css'

import RootApp from './containers/App'

const el = document.getElementById('root')
const render = (Component: React.ComponentClass) => {
    ReactDOM.render(<Component />, el)
}

render(RootApp)
if ((module as any).hot) {
    (module as any).hot.accept('./app', () => {
        render(RootApp)
    })
}
