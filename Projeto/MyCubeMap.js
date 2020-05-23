/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */



class MyCubeMap extends CGFobject{
    constructor(scene){
        super(scene)
        this.scene = scene
        this.initFaces()
        this.initMaterials()
        this.initTextures()

    }
    initFaces(){
        this.face = new MyQuad(this.scene, undefined)
    }
    initMaterials(){
        this.sideMaterial = new CGFappearance(this.scene)
        this.sideMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.sideMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.sideMaterial.setShininess(10.0);

        this.topMaterial = new CGFappearance(this.scene)
        this.topMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.sideMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.topMaterial.setShininess(10.0);
        
        this.bottomMaterial = new CGFappearance(this.scene)
        this.bottomMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.sideMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.bottomMaterial.setShininess(10.0);
    }
    initTextures(){
        this.frontTexture = new CGFtexture(this.scene, 'images/split_cubemap/front.png')
        this.leftTexture = new CGFtexture(this.scene, 'images/split_cubemap/left.png')
        this.backTexture = new CGFtexture(this.scene, 'images/split_cubemap/back.png')
        this.rightTexture = new CGFtexture(this.scene, 'images/split_cubemap/right.png')
        this.topTexture = new CGFtexture(this.scene, 'images/split_cubemap/top.png')
        this.bottomTexture = new CGFtexture(this.scene, 'images/split_cubemap/bottom.png')
    }
    //mineBottom

    setAllTextures(textures){
        this.frontTexture = textures[0]
        this.leftTexture = textures[1]
        this.backTexture = textures[2]
        this.rightTexture = textures[3]
        this.topTexture = textures[4]
        this.bottomTexture = textures[5]
    
    }

    display(){

        this.scene.pushMatrix()
        
        this.scene.scale(50,50,50);

        //Front face
        this.displayFront()

        //Back face
        this.displayBack()

        //Left face
        this.displayLeft()

        //Right face
        this.displayRight()

        //Top face
        this.displayTop()

        
        //Bottom face
        this.displayBottom()

        
        this.scene.popMatrix()

    }       


    displayBottom() {
        this.scene.pushMatrix()
        this.scene.translate(0, -0.5, 0)
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.bottomMaterial.setTexture(this.bottomTexture)
        this.bottomMaterial.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.face.display()
        this.scene.popMatrix()
    }

    displayTop() {
        this.scene.pushMatrix()
        this.scene.translate(0, 0.5, 0)
        this.scene.rotate(-Math.PI / 2, 1, 0, 0)
        this.topMaterial.setTexture(this.topTexture)
        this.topMaterial.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.face.display()
        this.scene.popMatrix()
    }

    displayRight() {
        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.scene.rotate(Math.PI / 2, 0, 1, 0)
        this.sideMaterial.setTexture(this.rightTexture)
        this.sideMaterial.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.face.display()
        this.scene.popMatrix()
    }

    displayLeft() {
        this.scene.pushMatrix()
        this.scene.translate(-0.5, 0, 0)
        this.scene.rotate(-Math.PI / 2, 0, 1, 0)
        this.sideMaterial.setTexture(this.leftTexture)
        this.sideMaterial.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.face.display()
        this.scene.popMatrix()
    }

    displayBack() {
        this.scene.pushMatrix()
        this.scene.translate(0, 0, -0.5)
        this.scene.rotate(Math.PI, 0, 1, 0)
        this.sideMaterial.setTexture(this.backTexture)
        this.sideMaterial.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.face.display()
        this.scene.popMatrix()
    }

    displayFront() {
        this.scene.pushMatrix()
        this.scene.translate(0, 0, 0.5)
        this.sideMaterial.setTexture(this.frontTexture)
        this.sideMaterial.apply()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.face.display()
        this.scene.popMatrix()
    }
}