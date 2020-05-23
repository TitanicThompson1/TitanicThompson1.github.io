/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
        
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 50, 25);
        this.cylinder = new MyCylinder(this, 50)
             
        this.vehicle = new MyVehicle(this)

        this.cube = new MyCubeMap(this);
        this.terrain = new MyTerrain (this, new MyPlane(this, 20))
        this.supplyList = [new MySupply(this), new MySupply(this), new MySupply(this), new MySupply(this), new MySupply(this)]

        this.nSuppliesDelivered = 0
        
        this.billboard = new MyBillboard(this, 'shaders/loadingBar.vert', 'shaders/loadingBar.frag');

        
        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayCylinder = false
        this.displaySphere = false        
        this.displayTerrain = true
        this.displayVehicle = true
        this.displayCube = true
        this.displayBillboard = true
        this.scaleFactor = 1;
        this.selectedTexture = -1;  
        this.speedFactor = 0.1

        this.textureIds = { 'Default texture': 0, 'Custom texture': 1};

        
        
        //Material to apply texture to
        this.material = new CGFappearance(this)
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.loadTexture('images/testMap.jpg')
        this.material.setTextureWrap('REPEAT', 'REPEAT');


        //Textures
        this.texture1 = [new CGFtexture(this, 'images/split_cubemap/front.png'),
                            new CGFtexture(this, 'images/split_cubemap/left.png'),
                            new CGFtexture(this, 'images/split_cubemap/back.png'),
                            new CGFtexture(this, 'images/split_cubemap/right.png'),
                            new CGFtexture(this, 'images/split_cubemap/top.png'),
                            new CGFtexture(this, 'images/split_cubemap/bottom.png')]

        this.texture2 = [new CGFtexture(this, 'images/split_cubemap/front1.png'),
                            new CGFtexture(this, 'images/split_cubemap/left1.png'),
                            new CGFtexture(this, 'images/split_cubemap/back1.png'),
                            new CGFtexture(this, 'images/split_cubemap/right1.png'),
                            new CGFtexture(this, 'images/split_cubemap/top1.png'),
                            new CGFtexture(this, 'images/split_cubemap/bottom1.png')]

                            
        this.textures = [this.texture1, this.texture2]


        this.bodyTexture = new CGFtexture(this, 'images/body.png')
        this.gondolaTexture = new CGFtexture(this, 'images/gondola.png')
        this.rudderTexture = new CGFtexture(this, 'images/rudder.png')

        //Setting vehicle textures
        this.vehicle.setBodyTexture(this.bodyTexture)
        this.vehicle.setGondolaTexture(this.gondolaTexture)
        this.vehicle.setRudderTexture(this.rudderTexture)

    
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        //this.camera = new CGFcamera(Math.PI/6, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
        this.camera = new CGFcamera(Math.PI/6, 0.1, 500, vec3.fromValues(40, 30, 40), vec3.fromValues(0, 10, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys()
        this.vehicle.update(t)
        this.udpateAllSupplies(t)
        //this.billboard.update(this.nSuppliesDelivered)
    }

    udpateAllSupplies(t){
        for(let i = 0; i < 5; i++)
            this.supplyList[i].update(t)
    }

    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        this.cube.setAllTextures(this.textures[this.selectedTexture])
        //this.vehicle.setAllTextures(this.textures[this.selectedTexture])
        //this.vehicle.display()
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            this.vehicle.accelerate(this.speedFactor)
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            keysPressed=true;
            this.vehicle.accelerate(-this.speedFactor)
        }
        if(this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            keysPressed=true;
            this.vehicle.turn(Math.PI/36)   //5º graus
            this.vehicle.rudderInclineLeft(true)
        }else{
            this.vehicle.rudderInclineLeft(false)
        }
        if(this.gui.isKeyPressed("KeyD")){
            text+=" D ";
            keysPressed=true;
            this.vehicle.turn(-Math.PI/36)
            this.vehicle.rudderInclineRight(true)
        }else {
            this.vehicle.rudderInclineRight(false)
        }
        if(this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            keysPressed=true;
            this.vehicle.reset()
            this.resetSupplies()
            this.billboard.update(this.nSuppliesDelivered)
            
        }
        if(this.gui.isKeyPressed("KeyP")){
            text+=" P ";
            keysPressed=true;
            this.vehicle.startAutoPilot(5,5)
        }
        if(this.gui.isKeyPressed("KeyL")){
            text+=" L ";
            keysPressed=true;
            this.dropSupply();
        }
        
        
        if (keysPressed)
            console.log(text);
    }

    
    dropSupply() {
        if (this.nSuppliesDelivered < 5) {
            this.supplyList[this.nSuppliesDelivered].drop(this.vehicle.getPosition());
            this.nSuppliesDelivered++;
            this.billboard.update(this.nSuppliesDelivered);
        }
    }

    resetSupplies(){
        for(let i = 0; i < 5; i++)
            this.supplyList[i].reset()
        this.nSuppliesDelivered = 0
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if(this.displaySphere){
            this.material.apply()
            this.incompleteSphere.display()
        }
        if(this.displayCylinder){
            this.material.apply()
            this.cylinder.display()
        }

        if(this.displayVehicle){
            this.pushMatrix()
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.vehicle.display()
            this.displaySupplies()
            this.popMatrix()
        }

        if (this.displayCube) {
            this.pushMatrix()
            this.translate(0,24,0)
            this.cube.display()
            this.popMatrix()

        }

        if (this.displayTerrain) {
            this.pushMatrix()
            this.translate(0,0.7,0)
            this.scale(50, 1 , 50)
            this.terrain.display()
            this.popMatrix()   
        }
        
        
        if(this.displayBillboard){
            this.pushMatrix()
            this.scale(3, 3, 3)
            this.billboard.display()
            this.popMatrix()
        }


    }


    displaySupplies(){
        for(let i = 0; i < 5; i++)
            this.supplyList[i].display()
    }
    
}