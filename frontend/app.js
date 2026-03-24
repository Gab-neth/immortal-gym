// LOGIN
function login(){
fetch('http://localhost:3000/api/login',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
cedula:document.getElementById('cedula').value,
password:document.getElementById('password').value
})
}).then(r=>r.json()).then(d=>{
if(d.msg==='ok'){
localStorage.setItem('cedula', d.user.CedulaUsuario);
window.location='dashboard.html';
}else alert(d.msg);
});
}

// IR A REGISTRO
function irRegistro(){
    window.location.href = "register.html";
}

// VOLVER
function volver(){
    window.location.href = "login.html";
}

// REGISTRO
function register(){

const nombre = document.getElementById('nombre').value;
const cedula = document.getElementById('cedula').value;
const telefono = document.getElementById('telefono').value;
const direccion = document.getElementById('direccion').value;
const password = document.getElementById('password')?.value;

if(!nombre || !cedula || !password){
    alert("Completa todos los campos");
    return;
}

fetch('http://localhost:3000/api/register',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
nombre,
cedula,
telefono,
direccion,
password
})
})
.then(r=>r.json())
.then(d=>{
    alert(d.msg || "Usuario creado");
    window.location='login.html';
})
.catch(err=>{
    console.error(err);
    alert("Error en registro");
});

}

// DASHBOARD
if(window.location.pathname.includes("dashboard.html")){
fetch('http://localhost:3000/api/user/'+localStorage.getItem('cedula'))
.then(r=>r.json())
.then(d=>{
document.getElementById('info').innerHTML = `
<h3>${d.NombreCompleto}</h3>
<p><b>Estado:</b> ${d.Estado==1?'Activo':'Inactivo'}</p>
<p><b>Teléfono:</b> ${d.Telefono}</p>
<p><b>Dirección:</b> ${d.Direccion}</p>
`;
});
}

// CAMBIO DE PESTAÑAS
function showTab(tab){
document.querySelectorAll('.tab').forEach(t=>t.style.display='none');
document.getElementById(tab).style.display='block';
}

// DATOS ARRIBA
if(window.location.pathname.includes("dashboard.html")){
fetch('http://localhost:3000/api/user/'+localStorage.getItem('cedula'))
.then(r=>r.json())
.then(d=>{
document.getElementById('info').innerHTML = `
<h3>${d.NombreCompleto}</h3>
<p>Estado: ${d.Estado==1?'Activo':'Inactivo'}</p>
<p>Tel: ${d.Telefono}</p>
<p>Dirección: ${d.Direccion}</p>
`;
});
}

// MOSTRAR FORMULARIO
function mostrarFormulario(){
document.getElementById('formActualizar').style.display='block';
}

// ACTUALIZAR
function actualizar(){
fetch('http://localhost:3000/api/update',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
cedula: localStorage.getItem('cedula'),
telefono: document.getElementById('telefonoEdit').value,
direccion: document.getElementById('direccionEdit').value
})
}).then(r=>r.json()).then(()=>{
alert("Datos actualizados");
location.reload();
});
}

// PLANES
function verPlan(tipo){
localStorage.setItem('plan', tipo);
window.location="plan.html";
}

if(window.location.pathname.includes("plan.html")){
const plan = localStorage.getItem('plan');

let titulo="", precio="", desc="";

if(plan=="normal"){
titulo="Plan Normal";
precio="$50.000";
desc="Acceso básico al gimnasio";
}
if(plan=="bimestral"){
titulo="Plan Bimestral";
precio="$90.000";
desc="Acceso por 2 meses";
}
if(plan=="semestral"){
titulo="Plan Semestral";
precio="$250.000";
desc="Acceso por 6 meses";
}

document.getElementById('titulo').innerText=titulo;
document.getElementById('precio').innerText=precio;
document.getElementById('desc').innerText=desc;
}

function irPago(){

const cedula = localStorage.getItem('cedula');
const plan = localStorage.getItem('plan');

console.log("CEDULA:", cedula);
console.log("PLAN:", plan);

fetch('http://localhost:3000/api/activar',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({ cedula, plan })
})
.then(r=>r.json())
.then(d=>{
    console.log("RESPUESTA:", d);
    alert("Plan activado correctamente");
    window.location="dashboard.html";
})
.catch(err=>{
    console.error("ERROR:", err);
    alert("Error al activar plan");
});

}

// CALENDARIO
let mes = new Date().getMonth();
let año = new Date().getFullYear();

function renderCalendar(){
const calendario = document.getElementById("calendar");
const dias = new Date(año, mes+1, 0).getDate();

let html = `<h3>${mes+1}/${año}</h3>`;

for(let i=1;i<=dias;i++){
html += `<div>${i}</div>`;
}

calendario.innerHTML = html;
}

function cambiarMes(valor){
mes += valor;

if(mes<0){mes=11; año--;}
if(mes>11){mes=0; año++;}

renderCalendar();
}

if(window.location.pathname.includes("dashboard.html")){
setTimeout(renderCalendar,500);
}

function showTab(tabName){

document.getElementById('datos').style.display = 'none';
document.getElementById('planes').style.display = 'none';
document.getElementById('calendario').style.display = 'none';

document.getElementById(tabName).style.display = 'block';
}