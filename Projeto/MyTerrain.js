
/**
 * 
 */
class MyTerrain extends CGFobject {
    constructor(scene, plane){
        super(scene)
        this.plane = plane
        this.scene = scene
        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag" )
        this.terrainMap = new CGFtexture (this.scene, 'images/heightmap2.jpg')
        this.terrainTex = new CGFtexture(this.scene, 'images/terrain.jpg')
        this.terrainShader.setUniformsValues({uSampler2: 1})
    }


    display(){

        this.scene.setActiveShader(this.terrainShader);
        this.terrainTex.bind()
        this.terrainMap.bind(1)
        this.scene.pushMatrix()

        this.scene.rotate(-Math.PI/2, 1,0,0)
        this.scene.translate(0, 0, -0.9)
        
        this.plane.display()
        
        this.scene.popMatrix()
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}