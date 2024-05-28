const contenedorTareas = document.querySelector(".tareas");
const formulario = document.querySelector("form");
const inputText = document.querySelector('form input[type = "text"]');

//new Tarea(1,"aprender JS",true,contenedorTareas);

//carga inicial de los datos
fetch("https://api-fullstack.onrender.com/tareas")
.then(respuesta => respuesta.json())
.then(tareas => {
    tareas.forEach(({id,tarea,terminada}) => {
        new Tarea(id,tarea,terminada,contenedorTareas);
    });
});


formulario.addEventListener("submit", async evento => {
    evento.preventDefault();
    
    if(inputText.value.trim() != ""){
        let tarea = inputText.value.trim();
        
        let {id,error} = await fetch("https://api-fullstack.onrender.com/tareas/nueva",{
            method : "POST",
            body : JSON.stringify({tarea}),
            headers : {
                "Content-type" : "application/json"
            }
        }).then(respuesta => respuesta.json());

        if(!error){
            new Tarea(id,tarea,false,contenedorTareas);
            return inputText.value = "";
        }
    }
    console.log("mostrar error al usuario");
});