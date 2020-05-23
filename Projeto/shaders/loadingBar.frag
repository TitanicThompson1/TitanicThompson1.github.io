#ifdef GL_ES
precision highp float;
#endif

uniform int numberOfDrops;

varying vec4 coordenates;
varying vec4 normal;

void main() {

    float transition = float(numberOfDrops)/5.0 - 0.5;


    if(coordenates.x > transition) {
        gl_FragColor = vec4(0.1, 0.1, 0.0, 1.0);
    } else {
        gl_FragColor.rgb = vec3(1.0 - (0.6 + coordenates.x / 0.6), 0.6 + coordenates.x / 0.6, 0);
        gl_FragColor.a = 1.0;
    }
    
}