function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //definisi titik-titik segitiga
    /**
     * A(-0.5, 0); B(-0.5, -0.5), C(0.5, -0.5)
     */

    var vertices = [-0.8, -0.4, -0.8, 0.4, -0.4, -0.4,
        0.0, 0.4, 0.0, -0.4
    ];
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    var vertexShaderCode = document.getElementById("vertexShaderCode").text;

    //membuat vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //definisi fragment shader
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;

    //membuat fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //package program --> compile
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //untuk menggambar 3 titik x, y vertex
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //set warna background
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    //clear background
    gl.clear(gl.COLOR_BUFFER_BIT);

    //instruksi untuk menggambar
    gl.drawArrays(gl.LINE_STRIP, 0, 6);
}