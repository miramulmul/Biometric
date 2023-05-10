// Define the HTML for the embedded widget

var url_direct = "https://www.fiscoclic.mx/Nomina/rh/firma/1398/5/13372/76e0ed0ba594da1eb4ec8bace41984cb9c12f700";

var BiometricFiscoclic = ({
    call: function(data) {
        this.Variables = data
        // this.Variables = data;
        url_direct = data.url; 
        console.log("Session variables updated:", data);
        // ... CODE TO UPDATE WIDGET WITH NEW SESSION VARIABLES ...
    },
    Variables: {}
});

var widgetHTML =
    '        <div id = "input">\n' +
    '            <p id = "signup_title">Onboarding FiscoClic</p>\n' +
    '            <a id = "return_office_button" href = "https://www.fiscoclic.mx"></a>\n' +
    '            <p id = "signup_description">Captura la siguiente información</p>\n' +
    '            <div class = "sign">\n' +
    '                <p id = "msg" class="msg"></p>\n' +
    '                <div style = "margin-bottom:0;width: 100%;">\n' +
    '                    <div class="title">RFC</div>\n' +
    '                    <input id="RFC" name="RFC" type="text"/>\n' +
    '                </div>\n' +
    '                <div style = "margin-top:16px; margin-bottom:0;width: 100%;">\n' +
    '                    <div class="title title1">Email</div>\n' +
    '                    <input id="email" name="email" type="text"/>\n' +
    '                </div>\n' +
    '                <div style = "margin-top:16px; margin-bottom:0;width: 100%;">\n' +
    '                    <div class="title title2">Whatsapp</div>\n' +
    '                    <input id="Whatsapp" name="Whatsapp" type="text"/>\n' +
    '                </div>\n' +
    '                <input id = "button" type = "button" class="btn" value="Siguiente"></br>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Fail_modal -->\n' +
    '        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
    '            <div class="modal-dialog modal-dialog-centered">\n' +
    '                <div class="modal-content">\n' +
    '                    <p class = "modal-description1" style = "margin-top: 5px">Error</p>\n' +
    '                    <div class="check-icon1">\n' +
    '                        <img style = "margin-top:49px;width: 71px; height: 80px;"src = "https://biometric.fiscoclic.mx/static/img/x.png"/>\n' +
    '                    </div>\n' +
    '                    <p id = "modal_inc">Lo sentimos...</p>\n' +
    '                    <p id = "modal_descrip1" class = "modal-description1">No estás registrado en Fiscoclic</p>\n' +
    '                    <button id = "fail_modal_button" type="button" class="btn btn-primary modal-button" data-bs-dismiss="modal">Entendido!</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>' +
    '        <div class="modal fade" id="gpsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
    '        <div class="modal-dialog modal-dialog-centered">' +
    '           <div class="modal-content">' +
    '                <p class = "modal-description1" style = "margin-top: 5px"></p>' +
    '                <div class="check-icon1">' +
    '                    <img style = "margin-top:43px;width: 71px; height: 80px;"src = "https://biometric.fiscoclic.mx/static/img/gps.png"/>' +
    '                </div>' +
    '                <p id = "modal_descrip_gps" class = "modal-description1">Necesitamos que habilites tu<br/>servicio de localización GPS</p>' +
    '                <button id = "gps_modal_button" type="button" class="btn btn-primary modal-button" data-bs-dismiss="modal">Entendido</button>' +
    '            </div>' +
    '        </div>' +
    '    </div>';

// Define the CSS for the embedded widget
var widgetCSS = '' +
    'body {' +
    'background-color: #1A68FD; !important' +
    '}' +
    '#input {\n' +
    '    display: flex;\n' +
    '    width: 100%;\n' +
    '    height: 100%;\n' +
    '    flex-direction: column;\n' +
    '    align-items: center;\n' +
    '    font-family: "Open Sans";\n' +
    '}\n' +
    '#signup_title {\n' +
    '  margin-top: 10.25vh;\n' +
    '  margin-bottom: 0;\n' +
    '  font-style: normal;\n' +
    '  font-weight: 700;\n' +
    '  font-size: 2.63vh;\n' +
    '  line-height: 3.548vh;\n' +
    '  color:#F9F9FF;\n' +
    '  text-align: center;\n' +
    '}\n' +
    '#return_office_button {\n' +
    '  margin-top: 4.4678vh;\n' +
    '  margin-bottom: 0;\n' +
    '  background: url(\'https://biometric.fiscoclic.mx/static/img/return_office_button.jpg\');\n' +
    '  background-position: center;\n' +
    '  background-size: contain;\n' +
    '  width: 60px;\n' +
    '  height: 60px;\n' +
    '  border-radius: 18%;\n' +
    '}\n' +
    '#signup_description {\n' +
    '  margin-top: 7.49vh;\n' +
    '  margin-bottom: 0;\n' +
    '  font-style: normal;\n' +
    '  font-weight: 500;\n' +
    '  font-size: 2.1vh;\n' +
    '  line-height: 2.89vh;\n' +
    '  align-items: center;\n' +
    '  color: #F9F9FF;\n' +
    '}\n' +
    '.sign {\n' +
    '  width: 327px;\n' +
    '  margin-top: 16px;\n' +
    '}\n' +
    '.title {\n' +
    '  position:relative;\n' +
    '  background: #fff;\n' +
    '  width: 46px;\n' +
    '  margin-bottom: -9px;\n' +
    '  border-radius: 9px;\n' +
    '  margin-left: 10px;\n' +
    '  font-style: normal;\n' +
    '  font-weight: 400;\n' +
    '  font-size: 14px;\n' +
    '  line-height: 19px;\n' +
    '  text-align: center;\n' +
    '}\n' +
    '.title0 {\n' +
    '  width: 52px;\n' +
    '}\n' +
    '.title1 {\n' +
    '  width: 59px;\n' +
    '}\n' +
    '.title2 {\n' +
    '  width: 90px;\n' +
    '}\n' +
    'input:-webkit-autofill,\n' +
    'input:-webkit-autofill:hover,\n' +
    'input:-webkit-autofill:focus,\n' +
    'input:-webkit-autofill:active {\n' +
    '  transition: background-color 5000s ease-in-out 0s;\n' +
    '}\n' +
    '\n' +
    'input {\n' +
    '  width: 100%;\n' +
    '  border-radius: 10px;\n' +
    '  height: 54px;\n' +
    '  border: 0;\n' +
    '  background: #fff;\n' +
    '}\n' +
    'input:focus-visible {\n' +
    '  border: 0 !important;\n' +
    '  outline: 0 !important;\n' +
    '}\n' +
    '.btn {\n' +
    '  margin-top: 31px;\n' +
    '  font-style: normal;\n' +
    '  font-weight: 600;\n' +
    '  font-size: 20px;\n' +
    '  line-height: 24px;\n' +
    '  align-items: center;\n' +
    '  text-align: center;\n' +
    '  color: #78726D;\n' +
    '  height: 50px;\n' +
    '  border-radius: 10px;\n' +
    '  background-color: #fff;\n' +
    '  padding: 0%;\n' +
    '}\n' +
    '.btn:hover {\n' +
    '  color: #78726D;\n' +
    '}\n' +
    '.msg {\n' +
    '  font-style: normal;\n' +
    '  font-weight: 500;\n' +
    '  font-size: 1.8vh;\n' +
    '  line-height: 2.4vh;\n' +
    '  align-items: center;\n' +
    '  color: #F9F9FF !important;\n' +
    '  margin-top: 0;\n' +
    '  text-align: center;\n' +
    '  margin-bottom: 10px;\n' +
    '}\n' +
    '\n' +
    '.modal-content {\n' +
    '  margin: auto;\n' +
    '  /* margin-bottom: 0; */\n' +
    '  align-items: center;\n' +
    '  /* justify-content: center; */\n' +
    '  text-align: center;\n' +
    '  width: 327px;\n' +
    '  height: 360px;\n' +
    '  border-radius: 20px !important;\n' +
    '}\n' +
    '\n' +
    '.check-icon1 {\n' +
    '  background: #FF0303;\n' +
    '  border-radius: 50%;\n' +
    '  width: 175px;\n' +
    '  height: 175px;\n' +
    '  margin-top: 15px;\n' +
    '  margin-bottom: 0px;\n' +
    '}\n' +
    '#modal_inc {\n' +
    '  margin-top: 12px;\n' +
    '  margin-bottom: 0px;\n' +
    '  /* font-family: "Manrope"; */\n' +
    '  font-weight: 400;\n' +
    '  font-style: normal;\n' +
    '  font-size: 16px;\n' +
    '  line-height: 22px;\n' +
    '  color:#567DF4;\n' +
    '}\n' +
    '\n' +
    '.modal-description1 {\n' +
    '  margin-top: 14px;\n' +
    '  margin-bottom: 0px;\n' +
    '  font-family: \'Manrope\';\n' +
    '  font-style: normal;\n' +
    '  font-weight: 500;\n' +
    '  font-size: 15px;\n' +
    '  line-height: 20px;\n' +
    '  text-align: center;\n' +
    '}\n' +
    '\n' +
    '.modal-button {\n' +
    '  width: 265px;\n' +
    '  height: 50px;\n' +
    '  border-radius: 10px;\n' +
    '  /* font-family: \'Manrope\'; */\n' +
    '  font-style: normal;\n' +
    '  font-weight: 600;\n' +
    '  font-size: 20px;\n' +
    '  line-height: 24px;\n' +
    '  margin-top: 14px;\n' +
    '  background-color: 1A68FD !important;\n' +
    '  color: fff;\n' +
    '  /* identical to box height, or 120% */\n' +
    '}';


// Define the JavaScript functions for the embedded widget
var myscript = `
    let b = document.getElementById('button');
    let RFC = document.getElementById('RFC');
    let email = document.getElementById('email');
    let Whatsapp = document.getElementById('Whatsapp');
    
    var latitude = -999999999, longitude = -999999999;
    function getgps(){
        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
            { timeout: 5000 },
            { maximumAge: 0 },
            {enableHighAccuracy: true}
        );

        function successCallback(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        }
    }
    getgps();
    let flggg = 0;
    function errorCallback(error) { 
        switch(error.code) { 
            case error.PERMISSION_DENIED:
                if(!flggg)show_error_modal_gps(); 
                else show_error_modal(0, "No se puede mostrar tu ubicación ya que NO tienes activado el GPS en tu dispositivo o no diste permiso");
                break; 
            case error.POSITION_UNAVAILABLE: 
                if(!flggg)show_error_modal_gps(); 
                else show_error_modal(0, "La información de Geolocalización no está disponible")
                break; 
            case error.TIMEOUT: 
                if(!flggg)show_error_modal_gps(); 
                else show_error_modal(0, "La solicitud de Geolocalización ha llevado mucho tiempo")
                break; 
            case error.UNKNOWN_ERROR: 
                if(!flggg)show_error_modal_gps(); 
                else show_error_modal(0, "Error desconocido");
                break; 
        } 
    }
    console.log(latitude, longitude)
    function reset(){
        RFC.value = "";
        email.value = "";
        Whatsapp.value = "";
    }

    function validate_email(mail){
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(mail)) return false;
        return true;
    }

    function validate_phone(number){
        var str = number
        var c = '0123456789';
        function check(x) {
            return c.includes(x)  ? true : false;
        }

        var matches = [...str].reduce((x, y) => check(y) ? x+y : x, '')
        
        if (matches.length != number.length)return false;
        return true;
    }

    function show_error_modal_gps(){
        document.getElementById('gpsModal').classList.add("show");
        document.getElementById('gpsModal').style.display = "block";
        document.getElementById('gpsModal').style.background = "#1A68FD";
        bms = document.getElementById('gps_modal_button');
        bms.onclick = () => {
            document.getElementById('gpsModal').classList.remove("show");
            document.getElementById('gpsModal').style.display = "none";
            flggg = 1;
            reset();
        }
    }

    function show_error_modal(num, des){
        if(!num){
            document.getElementById('modal_inc').style.display = "none";
            document.getElementById('modal_descrip1').innerHTML = des;
        }
        document.getElementById('exampleModal1').classList.add("show");
        document.getElementById('exampleModal1').style.display = "block";
        document.getElementById('exampleModal1').style.background = "#1A68FD";
        bms = document.getElementById('fail_modal_button');
        bms.onclick = () => {
            document.getElementById('modal_inc').style.display = "block";
            document.getElementById('modal_descrip1').innerHTML = "No estás registrado en Fiscoclic";
            document.getElementById('exampleModal1').classList.remove("show");
            document.getElementById('exampleModal1').style.display = "none";
            reset();
        }
    }

    function postForm(params, method){
        method = method || 'post';
        var form = document.createElement('form');
        form.setAttribute('method', method);
        form.setAttribute('action', "https://biometric.fiscoclic.mx/redirector");

        for (var key in params) {
            console.log(key)
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement('input');
                hiddenField.setAttribute('type', 'hidden');
                hiddenField.setAttribute('name', key);
                hiddenField.setAttribute('value', params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }

    b.onclick = () => {
        var uuid = new DeviceUUID().get();
        if(latitude == -999999999){
            getgps();
        }
        let msg = document.getElementById('msg');

        if(RFC.value.length < 12 || RFC.value.length > 13){
            msg.innerHTML = "La longitud de RFC debe ser 12~13!";
            reset();
        }
        else if(!validate_email(email.value)){
            msg.innerHTML = "Dirección de correo electrónico no válida!";
            reset();
        }
        else if(!validate_phone(Whatsapp.value)){
            msg.innerHTML = "¡Whatsapp debe contener solo un número!"
            reset();
        }
        else {
            let xhr = new XMLHttpRequest();
            let url = "https://www.fiscoclic.mx/Nomina/rh/FCRH_firmadigital/SRV_userIsOnboarded/";
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var data = JSON.parse(this.responseText);
                    data["email"] = email.value;
                    data['RFC'] = RFC.value;
                    data['url'] = url_direct;
                    console.log(data['url']);
                    if(data["ide"] == 0){
                        show_error_modal(1, "success");
                    }
                    else postForm(data);
                }
                else {
                    console.error(xhr);
                }
            };
            var data = JSON.stringify({ 
                "rfc": RFC.value, 
                "email": email.value, 
                "phone": Whatsapp.value, 
                "latitude": latitude + '',  
                "longitude": longitude + '', 
                "deviceID": uuid
            });
            xhr.send(data);
        }
    }
`;

// Find the target container on the target page
// var targetContainer = document.getElementById('widgetPlace');
var targetContainer = document.createElement('div');

// Insert the widget HTML into the target container
targetContainer.innerHTML = widgetHTML;
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

var scriptElement1 = document.createElement('script');
scriptElement1.src = 'https://biometric.fiscoclic.mx/static/js/device-uuid.js';
document.head.appendChild(scriptElement1);
