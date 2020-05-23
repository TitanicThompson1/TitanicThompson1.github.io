/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBillboard extends CGFobject{
    constructor(scene, loadingBarVert, loadingBarFrag){
        super(scene)
        this.scene = scene

        this.loadingShader = new CGFshader(this.scene.gl, loadingBarVert, loadingBarFrag);

        this.loadingShader.setUniformsValues({ numberOfDrops: 0 });

        this.initObjects()
        this.initMaterials()

        this.currentNSuppliesDelivered = 0 ;

    }
    initObjects() {
        this.board = new MyPlane(this.scene, 50);
        this.support = new MyPlane(this.scene, 50);
        this.loadingBar = new MyPlane(this.scene, 50);
    }

    initMaterials() {
        this.boardTexture = new CGFappearance(this.scene);
        this.boardTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.boardTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.boardTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.boardTexture.setShininess(10.0);
        this.boardTexture.loadTexture('images/billboard.png');
        this.boardTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.boardTexture2 = new CGFappearance(this.scene);
        this.boardTexture2.setAmbient(0.1, 0.1, 0.1, 1);
        this.boardTexture2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.boardTexture2.setSpecular(0.1, 0.1, 0.1, 1);
        this.boardTexture2.setShininess(10.0);
        this.boardTexture2.loadTexture('images/billboardBack.png');
        this.boardTexture2.setTextureWrap('REPEAT', 'REPEAT');

        this.supportTexture = new CGFappearance(this.scene);
        this.supportTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.supportTexture.setDiffuse(0.1, 0.1, 0.1, 1);
        this.supportTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.supportTexture.setShininess(10.0);
    }

    //This function receives the number of supplies dropped an updates the shadder
    update(t) {
        this.loadingShader.setUniformsValues({ numberOfDrops: t});
    }

    display() {

        this.scene.pushMatrix();
        
        
        this.displayBoard();

        this.displaySupports();

        this.displayLoadingBar();

        this.scene.popMatrix();
    }

    displayLoadingBar() {
        this.scene.setActiveShader(this.loadingShader);
        this.scene.pushMatrix();
        this.scene.translate(0, -0.15, 0.01);
        this.scene.scale(1.5, 0.2, 1);
        this.loadingBar.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    displaySupports() {
        this.supportTexture.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.7, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.support.display();
        this.scene.rotate(Math.PI,0, 1, 0)
        this.support.display()
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.7, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.support.display();
        this.scene.rotate(Math.PI,0, 1, 0)
        this.support.display()
        this.scene.popMatrix();
    }

    displayBoard() {

        this.scene.translate(-2, 1.5, 0);
        this.scene.rotate(Math.PI / 3.0, 0, 1, 0);
        this.boardTexture.apply();
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.board.display();
        this.boardTexture2.apply()
        this.scene.rotate(Math.PI,0, 1, 0)
        this.board.display();
        this.scene.popMatrix();
    }
}