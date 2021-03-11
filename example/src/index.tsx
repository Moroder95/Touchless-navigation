import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { TouchlessApp } from 'cant-touch-this'

ReactDOM.render(<TouchlessApp secondaryThreshold={0.5}><App /></TouchlessApp>, document.getElementById('root'))
