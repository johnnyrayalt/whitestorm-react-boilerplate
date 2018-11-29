import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as WHS from 'whs'

const SceneModule = require('whs')
const DefineModule = require('whs')
const ElementModule = require('whs')
const OrbitControlsModule = require('whs')
const PerspectiveCamera = require('whs')
const Plane = require('whs')
const RenderingModule = require('whs')

const App = WHS.App()


class Application extends React.Component {
  render() {
    return(
      <div className='div'>
        <h1>hello</h1>
      </div>
    )
  }
}

export default ReactDOM.render(<Application />, document.getElementById('app'))
