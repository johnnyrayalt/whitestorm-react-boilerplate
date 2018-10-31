import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as whs from 'whs'
import {FancyMaterialModule} from './modules/FancyMaterialModule'
import {BasicComponent} from './components/BasicComponent'

const App = require('whs'),
      SceneModule = require('whs'),
      DefineModule = require('whs'),
      ElementModule = require('whs'),
      OrbitControlsModule = require('whs'),
      PerspectiveCamera = require('whs'),
      Plane = require('whs'),
      RenderingModule = require('whs')


export class Application extends Component {
  render() {
    return(
      <App modules={[
        new SceneModule(),
        new DefineModule('camera', new PerspectiveCamera({
          position: {
            z: -15
          }
        })),
        new RenderingModule({bgColor: 0x000001}),
        new OrbitControlsModule()
      ]}>
        <Sphere
        geometry={[3, 32, 32]}
        material={new THREE.MeshBasicMaterial({color: 0xffffff})}
        />
      </App>
    )
  }
}

ReactDOM.render(<Application />, document.getElementById('app'))
