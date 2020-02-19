var agenda;
var index = 0;

//Al pasar el raton sobre el input del index apararece
function username()
{
    var username = document.getElementById("username").value;
    var x = document.getElementById("val");

    if(username != "")
    {          
        x.style.display = "none";
        return true;
    } 
    else
    {
        x.innerHTML = "Escrive tu nombre y pulsa doble click";
        x.style.display = "block";
        return false;
    }
}
//Añade galleta
function setCookie(cname,cvalue,exdays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//Recoge galleta
function getCookie(cname) 
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i < ca.length; i++) 
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//Chequea la galleta, si ya esta dice "Bienvenido de nuevo" y sino la crea
function checkCookie() 
{
    var user = getCookie("username");

    if (user != "") 
    {
        alert("Bienvenido de nuevo " + user);
        window.location.replace("./agenda.html");
    } 
    else 
    {
        user = document.getElementById("username").value;
        if (user != "" && user != null) 
        {
            setCookie("username", user, 30);
            window.location.replace("./agenda.html");
        }
    }
}

//ajax recibe los datos de una api con datos de usuarios
function apiUser()
{
    $.ajax({
        url: 'https://randomuser.me/api/?results=10&nat=es&noinfo',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            agenda = data;
        }
    });

    document.getElementById("titul").innerHTML = "Agenda de " + getCookie("username");
    inputFoto();
    butonConfirm();
}

//muestra el numero del actual de cuantos hay
function cuantos()
{
    document.getElementById("cuantos").innerHTML = (index+1) + ' / ' + agenda.results.length; 
}
//Pintar los datos
function pintamelo()
{
    document.getElementById("Name").value = agenda.results[index].name.first;
    document.getElementById("Email").value = agenda.results[index].email;
    document.getElementById("DNI").value = agenda.results[index].id.value.replace(/-/g,"");
    document.getElementById("Tlf").value = agenda.results[index].phone.replace(/-/g,"");
    document.getElementById("City").value = agenda.results[index].location.city;
    document.getElementById("Postcode").value = agenda.results[index].location.postcode;
    document.getElementById("foto").value = agenda.results[index].picture.large;
    document.getElementById("img").src = agenda.results[index].picture.large;
}


//Muestra el primer usuario
function primer()
{
    index = 0;
    pintamelo();
    cuantos();
}

//Muestra el ultimo usuario
function ultim()
{
    index = agenda.results.length - 1;
    pintamelo();
    cuantos();
}

//Boton siguiente muestra el siguiente usuario
function alante()
{
    if(index < agenda.results.length - 1)
    {
        index++;
        pintamelo();       
    }
    cuantos();
}

//Boton atras muestra el anterior usuario
function atras()
{
    if(index > 0)
    {
        index--;
        pintamelo();
    }
    cuantos();
}


//Valida nombre solo letras
function keyNombre(e)
{
    var x = document.getElementById("valNombre");
    var key = e.keyCode || e.which;

    if(key >= 65 && key <= 90 || key == 8 || key == 37 || key == 39 || key == 32 || key == 46)
    {
        x.style.display = "none";
        document.getElementById("sinNombre").style.display = "none";
        return true;
    }
    else
    {   
        x.style.display = "block";
        return false;
    }
}
//Valida nombre no puede estar vacio
function nombre()
{
    var x = document.getElementById("sinNombre");
    var n = document.getElementById("Name").value;

    if(n != "")
    {
        x.style.display = "none";
        return true;
    }
    else
    {
        x.style.display = "block";
        return false;
    }
}
///////////////////////////////// EXPRESIÓN  REGULAR  ////////////////////
//Valida email
function email()
{
    var x = document.getElementById("valEmail");
    var correo = document.getElementById("Email").value;


    if((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correo)))
    {
        x.style.display = "none";
        return true;
    } 
    else
    {
        x.style.display = "block";
        return false;
    }
}
//Valida DNI 8 numeros y una letra mayuscula
function DNI()
{
    var x = document.getElementById("valDNI");
    var nif = document.getElementById("DNI").value;

    if((/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(nif)))
    {
        x.style.display = "none";
        return true;
    }
    else
    {
        x.style.display = "block";
        return false;
    }
}
//Valida CP tenga 5 numeros
function CP()
{
    var x = document.getElementById("valPostcode");
    var cp = document.getElementById("Postcode").value;

    if((/(^([0-9]{5,5})|^)$/.test(cp)) && cp != "")
    {
        x.style.display = "none";
        return true;
    }
    else
    {
        x.style.display = "block";
        return false;
    }    
}

//Valida telefono solo numeros
function keyTelefono(e)
{
    var x = document.getElementById("valTlf");
    var key = e.keyCode || e.which;

    if(key >= 48 && key <= 57 || key == 8 || key == 37 || key == 39 || key == 46)
    {
        x.style.display = "none";
        document.getElementById("sinTlf").style.display = "none";
        return true;
    }
    else
    {   
        x.style.display = "block";
        return false;
    }
}
//Valida telefono no este vacio
function telefon ()
{
    var x = document.getElementById("sinTlf");
    var t = document.getElementById("Tlf").value;

    if(t != "")
    {
        x.style.display = "none";
        return true;
    }
    else
    {
        x.style.display = "block";
        return false;
    }
}
//Valida ciudad no este vacio
function city()
{
    var x = document.getElementById("valCity");
    var city = document.getElementById("City").value;

    if(city != "")
    {
        x.style.display = "none";
        return true;
    }
    else
    {
        x.style.display = "block";
        return false;
    }
}


//Muestra los botones del añadir
function verAdd()
{
    document.getElementById("Name").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("DNI").value = "";
    document.getElementById("Tlf").value = "";
    document.getElementById("City").value = "";
    document.getElementById("Postcode").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("img").src = "images/user.png";

    document.getElementById('addButon').style.display = 'block';
    document.getElementById("editFoto").style.display = "block";
    
    moverse();
    butone();
    butonElimina();
}
//quita los botones del añadir 
function tanca()
{
    document.getElementById("editFoto").style.display = "none";
    document.getElementById("addButon").style.display = "none";

    moverse();
    butone();
    alante();
    atras();
    butonElimina();
}

//Añair a la agenda
function add()
{
    if(nombre() && email() && DNI() && telefon() && city() && CP())
    {
        var Nom = document.getElementById("Name").value;
        var Mail = document.getElementById("Email").value;
        var Dni = document.getElementById("DNI").value;
        var Tlf = document.getElementById("Tlf").value;
        var City = document.getElementById("City").value;
        var Postal = document.getElementById("Postcode").value;
        var Foto = document.getElementById("foto").value;

        if(Foto == "")
            Foto = "images/user.png";

        var nuevo = {
            name: {first: Nom},
            email: Mail,
            id: {value: Dni},
            phone: Tlf,
            location: {
                city: City,
                postcode: Postal
            },
            picture: {
                large: Foto
            }
        };
        agenda.results.push(nuevo);

        document.getElementById('addButon').style.display = 'none';
        document.getElementById("editFoto").style.display = "none";

        ultim();
        moverse();
        butone();
        butonElimina();
    }
    
}
//Eliminar de la agenda
function del()
{
    var r = confirm("¿Estas seguro de eliminar?");

    if(r == true)
    {
        agenda.results.splice(index, 1);
        primer();
    }

}

//muestra oculta los botones de moverse alate atras etc..
function moverse()
{
    var x = document.getElementById("moverse");

    if(x.style.display == "none")
        x.style.display = "block";
    else
        x.style.display = "none";
}
//muestra o no el boton eliminar
function butonElimina()
{
    var x = document.getElementById("borrar");

    if(x.style.display == "none")
        x.style.display = "inline";
    else
        x.style.display = "none";
}
//muestra o no los botone de añadir y editar
function butone()
{
    var x = document.getElementById("butones");

    if(x.style.display == "none")
        x.style.display = "block";
    else
        x.style.display = "none";
}
//muestra o no el campo de foto
function inputFoto()
{
    var x = document.getElementById("editFoto");

    if(x.style.display == "none")
        x.style.display = "block";
    else
        x.style.display = "none";
}
//muestra o no el boton confirma de editar
function butonConfirm()
{
    var x = document.getElementById("confirm");

    if(x.style.display == "none")
        x.style.display = "inline";
    else
        x.style.display = "none";
}


//Habilita editar ocultando los demas botones y mostrando el campo para meter la imagen
function EnableEdit()
{
    var x = document.getElementById("editar");

    if(x.value == "Editar")
    {
        document.getElementById("editar").value = "Cancelar";
        inputFoto();
        butonConfirm();
        document.getElementById("anyiadir").style.display = "none";
    }
    else
    {
        document.getElementById("editar").value = "Editar";
        inputFoto();
        butonConfirm();
        document.getElementById("anyiadir").style.display = "inline";
    }

    moverse();
    butonElimina();
}
//Confimra el editar
function confirmaEdit()
{
    agenda.results[index].name.first = document.getElementById("Name").value;
    agenda.results[index].email = document.getElementById("Email").value;
    agenda.results[index].id.value = document.getElementById("DNI").value;
    agenda.results[index].phone = document.getElementById("Tlf").value;
    agenda.results[index].location.city = document.getElementById("City").value;
    agenda.results[index].location.postcode = document.getElementById("Postcode").value;

    if(document.getElementById("foto").value == "")
        agenda.results[index].picture.large = "images/user.png";
    else
        agenda.results[index].picture.large  = document.getElementById("foto").value;

    EnableEdit();
    pintamelo();
}