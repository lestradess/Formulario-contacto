//Con esto podemos observar todos los eventos una vez que termina de cargar el HTML
document.addEventListener("DOMContentLoaded", function () {
    const email = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    //selección elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector("#spinner");
    //Asignar eventos
    //? blur cuando sales del campo
    // :inputEmail.addEventListener("blur",function(e){
    // :    console.log(e.target.value);
    // :})
    // :inputAsunto.addEventListener("blur", function (e) {
    // :    console.log(e.target.value);
    // :})
    // :inputMensaje.addEventListener("blur", function (e) {
    // :    console.log(e.target.value);
    // :})
    // NotaS: Otra forma de hacerlo ***************
    // con la funcion validar
    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);
    formulario.addEventListener("submit", enviarEmail);
    btnReset.addEventListener("click", function (e) {
        e.preventDefault();
        //Reiniciar todo el objeto
        resetForm();

    });


    //Funciones**************************************************************
    function enviarEmail (e) {
        e.preventDefault();
        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");
            resetForm();

            //Crear una alerta
            const alertExito = document.createElement("P");
            alertExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm',
                'uppercase');
            alertExito.textContent = 'Mensaje enviado correctamente'
            formulario.appendChild(alertExito);
        }, 3000);

        setTimeout(() => {
            alertExito.remove();
        }, 3000);

    }
    function validar (e) {

        if (e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${ e.target.id } es obligatorio...`, e.target.parentElement);
            email[ e.target.name ] = '';
            comprobarDatos();
            // Con este return hacemos que salga de la función
            return;
        }
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es válido", e.target.parentElement);
            email[ e.target.name ] = '';
            comprobarDatos();
            return;
        }

        LimpiarAlerta(e.target.parentElement);
        //asignar valores a array de email
        email[ e.target.name ] = e.target.value.trim().toLowerCase();
        comprobarDatos();

    }
    function mostrarAlerta (mensaje, referencia) {
        //Comprueba si ya hay una alerta
        LimpiarAlerta(referencia);
        const error = document.createElement('P');
        //Mejor usar textContent que innerHTML
        error.textContent = mensaje;
        error.classList.add('text-red', 'p-1', 'alerta');//Se pone alerta para genererar esa clase
        //Inyectar el error al formulario
        referencia.appendChild(error);


    }
    function LimpiarAlerta (referencia) {
        const alerta = referencia.querySelector(".alerta");
        if (alerta) {
            alerta.remove();
        }
    }
    function validarEmail (email) {
        //expresión regular para email
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarDatos () {
        //Comprobamos si dentro del array de email hay algún elemento vacio.
        //Recuerda que nos da true si hay algún vácio
        if (Object.values(email).includes('')) {
            btnEnviar.classList.add("opacity-50");
            btnEnviar.disabled = true;
        } else {
            btnEnviar.classList.remove("opacity-50");
            btnEnviar.disabled = false;
        }
    }
    function resetForm () {
        email.email = "";
        email.asunto = "";
        email.mensaje = "";
        formulario.reset();
        comprobarDatos();
    }
});

