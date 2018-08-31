// TODO : fix those imports below
import THREE from '@/reflectance/ReflectanceImports'
import store from '@/store'
import * as CONST from '@/Constants'
import Boid from '@/components/three/fishes/Boid.js'

export default class FishManager extends THREE.Object3D {
  BIRTH_PLACE = new THREE.Vector3(300, 300, 0)
  NUM_FISH = 100
  fishes = []
  boids = []
  modelLoader = new THREE.OBJLoader()
  textureLoader = new THREE.TextureLoader()

  constructor () {
    super()
    this.matrixAutoUpdate = false
    this.modelLoader.load(CONST.FishModelPath, this.onModelLoaded)
    this.fishMaterial = new THREE.MeshStandardMaterial()
    this.fishMaterial.map = this.textureLoader.load(CONST.FishTexture)
  }

  onModelLoaded = (fishModel) => {
    this.textureLoader.load(CONST.WatchDiffuseMap)
    this.populate(fishModel)
  }

  populate (fishModel) {
    fishModel.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = this.fishMaterial
      }
    })
    for (var i = 0; i < this.NUM_FISH; i++) {
      this.boids[i] = new Boid()
      let boid = this.boids[i]

      boid.setAvoidWalls(true)
      boid.setWorldSize(store.state.stageSize.width, store.state.stageSize.height, 1000)
      boid.setWorldOrigin(this.BIRTH_PLACE)

      boid.position.x = Math.random() * store.state.stageSize.width
      boid.position.y = Math.random() * store.state.stageSize.height
      boid.position.z = -Math.random() * store.state.stageSize.height
      boid.velocity.x = Math.random() * 2 - 1
      boid.velocity.y = Math.random() * 2 - 1
      boid.velocity.z = Math.random() * 2 - 1

      fishModel.scale.x = 0.4
      fishModel.scale.y = 0.4
      fishModel.scale.z = 0.4
      fishModel.rotation.y = -3.14 / 2

      var clone = fishModel.clone()
      var fish = new THREE.Group()
      fish.matrixAutoUpdate = false
      fish.add(clone)
      this.add(fish)
      this.fishes.push(fish)
    }
  }

  updateFishes () {
    for (var i = 0, imax = this.fishes.length; i < imax; i++) {
      let boid = this.boids[i]
      boid.run(this.boids)

      let fish = this.fishes[i]
      let fishMatrixElements = fish.matrix.elements
      let y = Math.atan2(-boid.velocity.z, boid.velocity.x)
      let z = Math.asin(boid.velocity.y / boid.velocity.length())

      let c = Math.cos(y)
      let d = Math.sin(y)
      let e = Math.cos(z)
      let f = Math.sin(z)

      let ae = e
      let af = f

      fishMatrixElements[ 0 ] = c * e
      fishMatrixElements[ 4 ] = -c * f
      fishMatrixElements[ 8 ] = d

      fishMatrixElements[ 1 ] = af
      fishMatrixElements[ 5 ] = ae

      fishMatrixElements[ 2 ] = -ae * d
      fishMatrixElements[ 6 ] = af * d
      fishMatrixElements[ 10 ] = c

      fishMatrixElements[ 12 ] = this.boids[i].position.x
      fishMatrixElements[ 13 ] = this.boids[i].position.y
      fishMatrixElements[ 14 ] = this.boids[i].position.z
    }
  }
}