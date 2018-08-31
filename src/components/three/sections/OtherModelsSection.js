/*
* Section with alternative Watch models description inside
*/
import store from '@/store'
import * as THREE from 'three'
import Section from '../Section.js'
import HtmlTextureManager from '@/utils/HtmlTextureManager.js'
import Fader from '@/components/three/behaviors/Fader.js'

export default class OtherModelsSection extends Section {
  sectionWidth = 0.45 // 75% of screen width
  modelScaleFactor = 0.7
  models = []
  modelsMesh = []

  constructor (sectionData) {
    super(sectionData)
    this.models = this.sectionData.watches
    this.models.forEach(watch => {
      HtmlTextureManager.loadTextureById('other-models-section-' + watch.id, this.onTextureLoaded)
    })
  }

  onTextureLoaded = (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, visible: true })
    const geometry = new THREE.PlaneGeometry(texture.image.width, texture.image.height)
    const modelMesh = new THREE.Mesh(geometry, material)
    modelMesh.matrixAutoUpdate = false
    this.modelsMesh.push(modelMesh)
    Object.assign(
      modelMesh,
      new Fader(modelMesh)
    )
    this.add(modelMesh)
    this.resize()
  }

  resize () {
    super.resize()
    let xPos = 0
    let zPos = 0
    let meshBoundingBox = new THREE.Vector3()
    let viewportSize = store.state.viewportSizeAtCameraFocus
    let itemPadding = (viewportSize.width * this.sectionWidth) / (this.modelsMesh.length - 1)
    let itemIndex = 0
    let isPortrait = viewportSize.width < viewportSize.height
    this.modelsMesh.forEach(modelMesh => {
      modelMesh.geometry.computeBoundingBox()
      modelMesh.geometry.boundingBox.getSize(meshBoundingBox)
      xPos = isPortrait ? 0 : itemPadding * itemIndex
      zPos = isPortrait ? -2000 * itemIndex : 0
      this.modelScaleFactor = isPortrait ? 0.25 : 0.7
      modelMesh.position.set(xPos, 0, zPos)
      modelMesh.scale.set(this.modelScaleFactor, this.modelScaleFactor, this.modelScaleFactor)
      modelMesh.updateMatrix()
      modelMesh.updateMatrixWorld()
      itemIndex++
    })
    this.matrix.setPosition(new THREE.Vector3(-xPos * 0.5, this.matrix.elements[13], this.matrix.elements[14])) // Fast way to set x position but leaving y and z values untouched
  }
}