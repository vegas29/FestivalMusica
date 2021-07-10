document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
    
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    

    for(let i = 1; i<=12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;

        //Anadir la funcion de mostrarImagen

        imagen.onclick = mostrarImagen;
        imagen.dataset.imagenId= i;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
    
}


function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId);

    //Generar la imagen

    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    console.log(imagen);

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Cuando se da click por fuera, se cierra la imagen
    overlay.onclick = function(){
        overlay.remove();
    }

    //Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //Cuando se presiona se cierra la img

    cerrarImagen.onclick = function(){
        overlay.remove();

        const body = document.querySelector('body');

        if(body.classList.value === 'fijar-body'){
            body.classList.remove('fijar-body');
        }
    }

    overlay.appendChild(cerrarImagen);

    //Mostrarlo

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

    
}