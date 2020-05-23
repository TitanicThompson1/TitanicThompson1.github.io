
class MyFlag extends CGFobject {
    constructor(scene, texture, flagVert, flagFrag){
        super(scene)
        this.scene = scene
        
        this.flagShadder = new CGFshader(this.scene.gl, flagVert, flagFrag )
        this.texture = texture

        this.phase = 0.0
        this.previousTime = 0
        this.deltaT = 0

        this.flagShadder.setUniformsValues({phase : this.phase})
        this.initObjects()
        this.initMaterials()

        
    }
    initObjects(){
        this.plane =  new MyPlane(this.scene, 100)
    }

    initMaterials(){
        this.material = new CGFappearance(this.scene)
        this.material.setAmbient(0.6, 0.6, 0.6, 1)
        this.material.setDiffuse(0.6, 0.6, 0.6, 1)
        this.material.setSpecular(0.6, 0.6, 0.6, 1)

        this.material.setTexture(this.texture)
    }

    update(t, speed){
        
        if(this.previousTime == 0){
            this.previousTime = t
            return;
        }
        this.deltaT = (t - this.previousTime)*0.05

        this.phase += this.deltaT * (speed + 0.05)
        this.flagShadder.setUniformsValues({phase : this.phase})
        this.previousTime = t
    }

    display(){

        this.scene.setActiveShader(this.flagShadder);

        this.scene.pushMatrix()

        this.scene.scale(1, 2.3, 4)
        this.scene.rotate(Math.PI/2, 0, 1, 0)

        this.material.apply()
        this.plane.display()
        
        this.scene.popMatrix()

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}