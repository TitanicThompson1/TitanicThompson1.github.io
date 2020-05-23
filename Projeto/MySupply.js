/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */


const SupplyStates = { INACTIVE: 0, FALLING: 1, LANDED: 2 };

class MySupply extends CGFobject {
    
    constructor(scene) {
        //default content
        
        super(scene)
        this.scene = scene

        this.initVariables()
        this.initObjects()
    }
    
    initVariables() {
        this.state = SupplyStates.INACTIVE
        this.position = [0, 0, 0]
        this.previousTime = 0
    }

    initObjects(){
        this.package = new MyUnitCubeQuad(this.scene, new CGFtexture(this.scene, 'images/box1.png'))
        this.packageLanded = new MySplitQuad(this.scene, new CGFtexture(this.scene, 'images/box1.png'))
    }

    display() {

        if(this.state === SupplyStates.LANDED){
            this.displayLanded()
        }else if(this.state === SupplyStates.FALLING){
            this.displayFalling()
        } 
    }

    displayLanded(){
        this.scene.pushMatrix()
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.packageLanded.display()
        this.scene.popMatrix()
    }

    displayFalling(){
        this.scene.pushMatrix()

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.package.display()

        this.scene.popMatrix()
    }
   
    update(timePassed) {
        if(this.state === SupplyStates.FALLING) {
            if(this.previousTime === 0){
                this.previousTime = timePassed;
                return;
            }
            
            
            if(this.position[1] > 0){
                this.deltaDistance  = (timePassed - this.previousTime) / 1000 * this.speed;
                this.position[1] -= this.deltaDistance;
            }else{
                this.land();
            }
            this.previousTime = timePassed
            
        }
    }

    drop(position) {

        if(this.state != SupplyStates.INACTIVE) return;
        
        this.state = SupplyStates.FALLING;
        this.position[0] = position[0]
        this.position[1] = position[1]
        this.position[2] = position[2]
     
        this.position[1] -= 1.0;
        this.speed = this.position[1] / 3;
    }

    land() {
        this.position[1] = 0.1;
        this.state = SupplyStates.LANDED;
    }

    reset() {
        this.state = SupplyStates.INACTIVE;
        this.position = [0,0,0]
        this.speed = 0;
        this.previousTime = 0
    }
}