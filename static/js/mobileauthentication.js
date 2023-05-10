var widgetHTML = `
    <div id="input">
    <img id = "question_pic" style = "width: 48px; height: 48px; margin-top: 1.44vh; display: none;">
    <div id="camera_input">
        <p id = 'description'>Sigue las instrucciones para la<br/>
            validación biométrica</p>
        <p id = "question"></p>
        <p id = "question_description"></p>
        <div style = "position: relative; margin-top: 0; ">
            <video id="myVideo" autoplay playsinline muted>
            </video>
            <div class = "spinner">
                <span id = "spinners" class="spinner-double-section-out" style = "display: none"></span>
            </div>
        </div>
    </div>
    <div id = "capture" style = "text-align: center;">
        <p id = "description1">
            Centra tu cara en medio del círculo y da<br/>
            clic en el siguiente ícono cuando estes listo
        </p>
        <div id="capture_button" class="btn"></div>
        <p class = "capture_button_des">INICIAR</p>
    </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <img style = "margin-top:4px; width: 169px; height: 143px;"src = "https://biometric.fiscoclic.mx/static/img/crea-grupos.png"/>
            <p id = "modal_inc"></p>
            <p id = "modal_descrip" class = "modal-description"></p>
            <div id = "success_modal_button" class="btn check-icon">
                <img style = "margin-top:15px; width: 30.67px; height: 21.08px;"src = "https://biometric.fiscoclic.mx/static/img/Vector.png"/>
            </div>
        </div>
    </div>
    </div>

    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="check-icon1">
                <img style = "margin-top:31px; width: 53.33px; height: 60px;"src = "https://biometric.fiscoclic.mx/static/img/x.png"/>
            </div>
            <p id = "modal_descrip1" class = "modal-description1"></p>
            <button id = "fail_modal_button" type="button" class="btn btn-primary modal-button" data-bs-dismiss="modal">Siguiente</button>
        </div>
    </div>
    </div>

    <div class="modal fade" id="startModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-content-start">
            <div class="check-icon-start">
                <img style = "margin-left: 10px; margin-top: 37px; width: 67.75px; height: 68.04px;"src = "https://biometric.fiscoclic.mx/static/img/Group.png"/>
            </div>
            <p id = "modal_descrip-start" class = "modal-description-start"></p>
        </div>
    </div>
    </div> 
`;

var widgetCSS = `
    #input {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: center;
    }

    #camera_input {
        position: relative;
        margin: 0%;
        float: center;
        padding: 0%;
        width: 100%;
        text-align: center;

    }

    @media only screen and (min-device-width:321px) and (max-device-width:375px){
        #myVideo {
            width: 80vw !important;
            height: 80vw !important;
        }
        
        .spinner {
            left: 10vw !important;
        }
        
        .spinner-section-out, .spinner-double-section-out, .spinner-double-section {
            width: 80vw !important;
            height: 80vw !important;
        }
        
        .spinner-section-out:before, .spinner-double-section-out:before, .spinner-double-section:before, .spinner-section-out:after, .spinner-double-section-out:after, .spinner-double-section:after {
            width: 80vw !important;
            height: 80vw !important;
        }
        .spinner-section-out:before, .spinner-double-section-out:before, .spinner-section-out:after, .spinner-double-section-out:after {
            width: 82vw !important;
            height: 82vw !important;
        }
        
    }

    @media only screen and (min-device-width:376px) and (max-device-width:425px){
        #myVideo {
            width: 75vw !important;
            height: 75vw !important;
        }
        
        .spinner {
            left: 12.5vw !important;
        }
        .spinner-section-out, .spinner-double-section-out, .spinner-double-section {
            width: 75vw !important;
            height: 75vw !important;
        }
        .spinner-section-out:before, .spinner-double-section-out:before, .spinner-double-section:before, .spinner-section-out:after, .spinner-double-section-out:after, .spinner-double-section:after {
            width: 75vw !important;
            height: 75vw !important;
        }
        
        .spinner-section-out:before, .spinner-double-section-out:before, .spinner-section-out:after, .spinner-double-section-out:after {
            width: 77vw !important;
            height: 77vw !important;
        }
    }

    @media only screen and (min-device-width:426px) and (max-device-width:768px){
        #myVideo {
            width: 58.6vw!important;
            height: 58.6vw !important;
        }
        .spinner {
            left: 20.7vw !important;
        }
        .spinner-section-out, .spinner-double-section-out, .spinner-double-section {
            width: 58.6vw !important;
            height: 58.6vw !important;
        }
        .spinner-section-out:before, .spinner-double-section-out:before, .spinner-double-section:before, .spinner-section-out:after, .spinner-double-section-out:after, .spinner-double-section:after {
            width: 58.6vw !important;
            height: 58.6vw !important;
        }
        .spinner-section-out:before, .spinner-double-section-out:before, .spinner-section-out:after, .spinner-double-section-out:after {
            width: 60.6vw !important;
            height: 60.6vw !important;
        }
    }
    @media only screen and (min-device-width:769px) and (max-device-width:1024px){
        #myVideo {
            width: 38vw!important;
            height: 38vw !important;
        }
        
        .spinner {
            left: 31vw !important;
        }
        .spinner-section-out, .spinner-double-section-out, .spinner-double-section {
            width: 38vw !important;
            height: 38vw !important;
        }
        .spinner-section-out:before, .spinner-double-section-out:before, .spinner-double-section:before, .spinner-section-out:after, .spinner-double-section-out:after, .spinner-double-section:after {
            width: 38vw !important;
            height: 38vw !important;
        }
        .spinner-section-out:before, .spinner-double-section-out:before, .spinner-section-out:after, .spinner-double-section-out:after {
            width: 40vw !important;
            height: 40vw !important;
        }
        
    }
    #myVideo {
        margin-top: 2.89vh;
        margin-bottom: 0;
        position: relative;
        border-radius: 50%;
        object-fit: cover;
        width: 30vw;
        height: 30vw;
        z-index: 0;
    }

    #description {
        margin-top: 3.67936vh;
        /* font-family: "Manrope"; */
        font-style: normal;
        font-weight: 500;
        font-size: 1.97vh;
        line-height: 2.628vh;
        color: #F9F9FF;
        margin-bottom: 0;
    }

    video,
    canvas {
        transform: scale(-1, 1);
        /*For Firefox (& IE) */
        -webkit-transform: scale(-1, 1);
        /*for Chrome & Opera (& Safari) */
    }

    #capture_button {
        margin-top: 3.67936vh;
        margin-bottom: 0;
        background: url('https://biometric.fiscoclic.mx/static/img/face.png');
        background-size: cover;
        background-repeat: no-repeat;
        width: 125px;
        height: 122px;
    }
    #capture_button:hover {
        opacity: 0.6;
    }
    .capture_button_des {
        margin-top: 1.84vh;
        margin-bottom: 0;
        /* font-family: "Manrope"; */
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 24px;
        color: #FFFCF9;
    }
    #description1 {
        margin-top: 3.4166vh;
        /* font-family: "Manrope"; */
        font-style: normal;
        font-weight: 500;
        font-size: 1.97vh;
        line-height: 2.628vh;
        color: #F9F9FF;
        margin-bottom: 0;
    }
    #question {
        margin-top: 0.657vh;
        margin-bottom: 0;
        /* font-family: "Manrope"; */
        font-style: normal;
        font-weight: 800;
        font-size: 3.15vh;
        line-height: 4.33vh;
        text-align: center;
        color:#F9F9FF;
        display: none;
    }
    #question_description {
        margin-top: 1.5768vh;
        margin-bottom: 0;
        /* font-family: "Manrope"; */
        font-style: normal;
        font-weight: 500;
        font-size: 1.97vh;
        line-height: 2.628vh;
        text-align: center;
        color:#F9F9FF;
        display: none;
    }
    #waiting {
        margin-top: 3.4166vh;
        margin-bottom: 0;
        width: 297px;
        height: 63px;
        display: none;
    }

    .modal-content {
        margin: auto;
        /* margin-bottom: 0; */
        align-items: center;
        /* justify-content: center; */
        text-align: center;
        width: 327px;
        height: 388px;
        border-radius: 20px !important;
    }

    .check-icon {
        margin-top: 29px;
        background: rgba(86, 125, 244, 0.1);
        border-radius: 50%;
        width: 69px;
        height: 69px;
    }

    .check-icon1 {
        background: #FF0303;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        margin-top: 85px;
        margin-bottom: 0px;
    }
    #modal_inc {
        margin-top: 29px;
        margin-bottom: 0px;
        /* font-family: "Manrope"; */
        font-weight: 400;
        font-style: normal;
        font-size: 24px;
        line-height: 33px;
        color:#567DF4;
    }
    .modal-description {
        margin-top: 15px;
        margin-bottom: 0;
        /* font-family: 'Manrope'; */
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 27px;
        text-align: center;
    }

    .modal-description1 {
        margin-top: 40px;
        margin-bottom: 0px;
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
    }
    .modal-button {
        width: 265px;
        height: 50px;
        border-radius: 10px;
        /* font-family: 'Manrope'; */
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        margin-top: 14px;
        /* identical to box height, or 120% */
    }

    .modal-content-start {
        margin: auto;
        align-items: center;
        text-align: center;
        width: 327px;
        height: 296px;
        border-radius: 8% !important;
    }

    .check-icon-start {
        background: rgba(86, 125, 244, 0.1);
        border-radius: 50%;
        width: 139px;
        height: 139px;
        margin-top: 48px;
        margin-bottom: 0px;
    }

    .modal-description-start {
        margin-top: 22px;
        margin-bottom: 0px;
        /* font-family: 'Manrope'; */
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
    }

    body {
        overflow-x: hidden;
    }

    #js-log h3{
        color: #fff;
        font-size: 16px !important;
    }

    .spinner {
        top: 2.89vh;
        left: 35vw;
        margin-top: auto;
        margin-left: auto;
        position: absolute;
        z-index: 1;
    }

    .spinner-section-out, .spinner-double-section-out, .spinner-double-section {
        display: block;
        float: center;
        width: 30vw;
        height: 30vw;
        border-radius: 50%;
        border: 1vw solid #fff;
        animation: spinner 1.2s linear infinite;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0);
    }
        100% {
            transform: rotate(360deg);
    }
    }

    .spinner-section-out, .spinner-double-section-out, .spinner-double-section {
        position: relative;
    }

    .spinner-section-out:before, .spinner-double-section-out:before, .spinner-double-section:before, .spinner-section-out:after, .spinner-double-section-out:after, .spinner-double-section:after {
        content: '';
        position: absolute;
        top: -1vw;
        left: -1vw;
        display: block;
        width: 30vw;
        height: 30vw;
        border-radius: 50%;
        border: 1vw solid transparent;
        border-top-color: black;
    }


    .spinner-section-out:before, .spinner-double-section-out:before, .spinner-section-out:after, .spinner-double-section-out:after {
        top: -2vw;
        left: -2vw;
        width: 32vw;
        height: 32vw;
    }
    .spinner-section-out:after, .spinner-double-section-out:after, .spinner-double-section:after {
        border-top-color: transparent;
        border-bottom-color: black;
    }

    .spinner-section-out:after {
        display: none;
    }
`;

var myscript = `
    let v = document.getElementById("myVideo");
    let b = document.getElementById("capture_button");

    let question = "Smile";
    let imageCanvas = document.createElement('canvas');
    let imageCtx = imageCanvas.getContext("2d");

    function postFile(file) {
        let formdata = new FormData();
        formdata.append("question", question);
        formdata.append("image", file);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', "https://biometric.fiscoclic.mx/mobileauthentication", true);
        xhr.onload = function () {
            if (this.status === 200) {
                var data = JSON.parse(this.responseText);
                if(data['final'] == true){
                    console.log('------------------')
                    question = ""
                    if(data['token'] != 'Unknown'){
                        let nameee = 'Hola ' + data['name'] + '!';
                        document.getElementById('modal_inc').innerHTML = nameee;
                        document.getElementById('modal_descrip').innerHTML = "Gracias por regresar a FiscoClic";
                        document.getElementById('exampleModal').classList.add("show");
                        document.getElementById('exampleModal').style.display = "block";
                        document.getElementById('exampleModal').style.background = "#1A68FD";
                        setTimeout(() => {
                            document.getElementById('exampleModal').classList.remove("show");
                            document.getElementById('exampleModal').style.display = "none";
                            document.getElementById('modal_descrip-start').innerHTML = "Perfecto! Te estamos redirigiendo...";

                            document.getElementById('startModal').classList.add("show");
                            document.getElementById('startModal').style.display = "block";
                            document.getElementById('startModal').style.background = "#5A5977";
                        }, 3000)
                        var parameter = data['token'];
                        console.log(parameter)
                        var userAgent = window.navigator.userAgent.toLowerCase(),
                            ios = /iphone|ipod|ipad/.test( userAgent );
                        if(ios)webkit.messageHandlers.myScriptMessageHandler.postMessage(parameter);
                        else window.myJavaScriptInterface.onReceiveParameter(parameter);
                    }
                    else if(data['not_find_face'] == true)takeawhile("not_find_face")
                    else takeawhile("fail_face");
                }
                else if(data['is_cal'] == true){
                    console.log("-----------is_cal-------------")
                    if(data['success'] == true)send_for_id();
                    else takeawhile("fail_spoofy");
                }
                else{
                    console.log("--------------")
                }
            }
            else {
                console.error(xhr);
            }
        };
        xhr.send(formdata);
    }

    function send_for_id(){
        question = "final_img"
        document.getElementById('spinners').style.display = "none";
        document.getElementById('question').innerHTML = "MIRA DE FRENTE";
        document.getElementById('question_description').innerHTML = "y espera unos segundos en esa posición...";
        document.getElementById('question_pic').src = "https://biometric.fiscoclic.mx/static/img/neutral.png";
        let intervalID
        if(!intervalID)intervalID = setInterval(() => {
            sendImagefromCanvas();
            document.getElementById('spinners').style.display = "block";
            clearInterval(intervalID)
            intervalID = null;
        }, 1000)
    }

    function takeawhile(message){
        if(message == "fail_spoofy")document.getElementById('modal_descrip1').innerHTML = "No se puede detectar una persona.<br>Intenta de nuevo";
        else if(message == "fail_face")document.getElementById('modal_descrip1').innerHTML = "no te conozco";
        else document.getElementById('modal_descrip1').innerHTML = "No puedo reconocer tu cara<br>Centra tu cara en el<br>medio del círculo e inténtalo de nuevo";
        document.getElementById('exampleModal1').classList.add("show");
        document.getElementById('exampleModal1').style.display = "block";
        document.getElementById('exampleModal1').style.background = "#5A5977";
        bms = document.getElementById('fail_modal_button');
        bms.onclick = () => {
            window.location.href = "https://biometric.fiscoclic.mx/test";
            document.getElementById('exampleModal1').classList.remove("show");
            document.getElementById('exampleModal1').style.display = "none";
        }
    }

    //Get the image from the canvas
    function sendImagefromCanvas() {
        //Make sure the canvas is set to the current video size
        imageCanvas.width = v.videoWidth;
        imageCanvas.height = v.videoHeight;
        imageCtx.drawImage(v, 0, 0, v.videoWidth, v.videoHeight);
        imageCanvas.toBlob(postFile, 'image/jpeg');
    }
    const questions = [
        "Smile",
    ];

    function send(){
        let j = 0, intervalID;
        if(!intervalID)intervalID = setInterval(() => {
            j ++;
            sendImagefromCanvas()
            console.log(j)
            if(j == 25){
                document.getElementById('spinners').style.display = "block";
                clearInterval(intervalID)
                intervalID = null;
            }
        }, 80)
    }

    function sendImage(){
        const random = Math.floor(Math.random() * questions.length);
        question = questions[random];
        let des = "";
        document.getElementById('spinners').style.display = "none";
        des = "SONRIE";
        document.getElementById('question').innerHTML = des;
        document.getElementById('question').style.display = "block";
        document.getElementById('question_description').innerHTML = "y espera unos segundos en esa posición";
        document.getElementById('question_description').style.display = "block";
        img = document.getElementById('question_pic');
        img.src = "https://biometric.fiscoclic.mx/static/img/smile.png";
        img.style.display = "block";
        let intervalID
        if(!intervalID)intervalID = setInterval(() => {
            send();
            clearInterval(intervalID)
            intervalID = null;
        }, 1000)
    }

    b.onclick = () => {
        console.log('clicked button');
        document.getElementById('description').style.display = "none";
        document.getElementById('capture').style.display = "none";
        sendImage();
    }

    let streaming = false;
    window.onload = function () {
        video = document.getElementById("myVideo");
        navigator.mediaDevices
            .getUserMedia({ 
                video: {
                    facingMode: 'user'
                },
                audio: false }
            )
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(err);
            });
    };
`;

var targetContainer = document.createElement('div');
targetContainer.innerHTML = widgetHTML;
targetContainer.style.backgroundColor = "#1A68FD"
document.getElementsByTagName('*')[0].appendChild(targetContainer);

var meta = document.createElement('meta');
meta.httpEquiv = 'Content-Security-Policy';
meta.content = "upgrade-insecure-requests";
document.head.appendChild(meta);

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css';
link.integrity = 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC';
link.crossOrigin = 'anonymous';
document.head.appendChild(link);

var script1 = document.createElement('script');
script1.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';
script1.integrity = 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM';
script1.crossOrigin = 'anonymous';
document.head.appendChild(script1);

var script2 = document.createElement('script');
script2.src = 'https://webrtc.github.io/adapter/adapter-latest.js';
document.head.appendChild(script2);

// Add the widget JS to the target page
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML = myscript;
document.head.appendChild(scriptElement);

var meta1 = document.createElement('meta');
meta1.name = "viewport";
meta1.content = "width=device-width, initial-scale=1";
document.head.appendChild(meta1);

// Add the widget CSS to the target page
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = widgetCSS;
document.head.appendChild(style);