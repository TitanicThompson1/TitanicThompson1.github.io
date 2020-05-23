/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject{
    constructor(scene, slices){
        super(scene)
        this.slices = slices
        this.initBuffers();
    }
    initBuffers(){

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []

        

        let ang = 0;
        let alphaAng = 2 * Math.PI/this.slices;

        
        for(let i = 0; i < this.slices; i++){

            //Pushing the bottom vertices
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            
            //Pushing all indices
            this.indices.push(i, i + 1, i + 1 + this.slices);
            this.indices.push(i + 1, i + 2 + this.slices, i + 1 + this.slices);
            
            //Pushing bottom vertices
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            
            //Updating angles
            ang+=alphaAng;
        }

        //Pushing extra vertice for texture
        this.vertices.push(1, 0, 0);
        this.normals.push(1, 0, 0);
        
        //Reseting angle
        ang = 0 

        //Pushing the top vertices
        for(let i = 0; i < this.slices; i++){
            
            //Pushing top vertices
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            
            //Pushing top normals
            this.normals.push(Math.cos(ang), 1, -Math.sin(ang));
            
            //Updating angle
            ang+=alphaAng;
        }
        
        //Pushing extra vertice for texture
        this.vertices.push(1, 1, 0);
        this.normals.push(1, 1, 0);
        
        //Pushing text coord
        for(let i = 0; i <= this.slices; i++){
            this.texCoords.push(i/this.slices, 1)
        }
        
        for(let i = 0; i <= this.slices; i++){
            this.texCoords.push(i/this.slices, 0)
        }
     
        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}