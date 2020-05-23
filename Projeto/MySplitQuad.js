/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MySplitQuad extends CGFobject {
    constructor(scene, textures) {
        super(scene)
        this.scene = scene
        this.initFaces()
        this.initMaterials()
        this.initTextures(textures)

    }
    initFaces() {
        this.front = new MyQuad(this.scene, undefined)
        this.back = new MyQuad(this.scene, undefined)
        this.left = new MyQuad(this.scene, undefined)
        this.right = new MyQuad(this.scene, undefined)
        this.top = new MyQuad(this.scene, undefined)
        this.bottom = new MyQuad(this.scene, undefined)
    }
    initMaterials() {
        this.material = new CGFappearance(this.scene)
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.material.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.material.setShininess(10.0);
      
    }
    initTextures(textures) {
        this.texture = textures
      
    }
    


    display() {        

        //Center face
        this.displayCenterFace()

        //Top face
        this.displayTopFace()

        //Left face
        this.displayLeftFace()

        //Right face
        this.displayRightFace()

        //Back face
        this.displayBackFace()

        //Backer face
        this.displayBackerFace()

    }


    displayBackerFace() {
        this.scene.pushMatrix()
        this.scene.translate(2, 0, 0)
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.material.setTexture(this.texture)
        this.material.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.bottom.display()
        this.scene.popMatrix()
    }

    displayBackFace() {
        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0)
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.material.setTexture(this.texture)
        this.material.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.top.display()
        this.scene.popMatrix()
    }

    displayRightFace() {
        this.scene.pushMatrix()
        this.scene.translate(0, 0, -1)
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.material.setTexture(this.texture)
        this.material.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.right.display()
        this.scene.popMatrix()
    }

    displayLeftFace() {
        this.scene.pushMatrix()
        this.scene.translate(0, 0, 1)
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.material.setTexture(this.texture)
        this.material.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.left.display()
        this.scene.popMatrix()
    }

    displayTopFace() {
        this.scene.pushMatrix()
        this.scene.translate(-1, 0, 0)
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.material.setTexture(this.texture)
        this.material.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.back.display()
        this.scene.popMatrix()
    }

    displayCenterFace() {
        this.scene.pushMatrix()
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.material.setTexture(this.texture)
        this.material.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.front.display()
        this.scene.popMatrix()
    }
}