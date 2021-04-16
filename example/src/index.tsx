import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { TouchlessApp } from 'touchless-navigation';


ReactDOM.render(<TouchlessApp interactionType="leapMotion"><App /></TouchlessApp>, document.getElementById('root'))
