//Clases

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = parseFloat(presupuesto);
        this.restante = parseFloat(presupuesto)
    }
    mostrarPresupuesto() {
        const presupuestoSpan = document.getElementById('presupuesto__span');
        presupuestoSpan.textContent = `${this.presupuesto}`
    }
    mostrrRestante() {
        const restanteSpan = document.getElementById('restante__span');
        restanteSpan.textContent = `${this.presupuesto}`
    }

    reiniciarValores(){
        const presupuestoSpan = document.getElementById('presupuesto__span');
        const restanteSpan = document.getElementById('restante__span');

        presupuestoSpan.textContent = `${Number(0)}`;
        restanteSpan.textContent = `${Number(0)}`;
    }
}

class Restante {
    calcularRestante(costo) {
        let restante = document.getElementById('restante__span').textContent;
        let nuevoRestante = Number(restante) - Number(costo);
        document.getElementById('restante__span').textContent = `${nuevoRestante}`; 
    }

    colorearRestante(presupuesto) {
        let restante = Number(document.getElementById('restante__span').textContent);
        if ( (restante >= (0.71*presupuesto)) ) {
            document.getElementById('restante').style.backgroundColor = 'rgb(170, 233, 170)';
        }else if ( (restante <= (0.70*presupuesto)) && (restante >= (0.25*presupuesto)) ) {
            document.getElementById('restante').style.backgroundColor = 'rgb(230, 230, 122)';
        }else{
            document.getElementById('restante').style.backgroundColor = 'rgb(252, 135, 141)';
        }
        console.log(0.74*presupuesto);
    }
}


class LocalStorage {
    constructor() {
        this.gasto = document.getElementById('gasto').value;
        this.costo = document.getElementById('costo').value;
        this.presupuesto = parseFloat(document.getElementById('presupuesto__span').textContent);
        this.restante = parseFloat(document.getElementById('restante__span').textContent);
    }

    save() {
        let gastoDescripcion = {
            gasto : this.gasto,
            costo : this.costo,
            presupuesto: this.presupuesto,
            restante: this.restante
        }

        if (localStorage.getItem('gastos') === null ) {
            let gastos = [];
            gastos.push(gastoDescripcion);
            localStorage.setItem('gastos', JSON.stringify(gastos));
        }else{
            let gastos = JSON.parse(localStorage.getItem('gastos'));
            gastos.push(gastoDescripcion);
            localStorage.setItem('gastos', JSON.stringify(gastos));
        }
    }

    mostrarGastos() {
        let gastos = JSON.parse(localStorage.getItem('gastos'));
        let container = document.getElementById('gastos_container');
        container.textContent = '';
        for (let i = 0; i < gastos.length; i++) {
            let gasto = gastos[i].gasto;
            let costo = gastos[i].costo;
            let presupuesto = gastos[i].presupuesto;
            let restante = gastos[i].restante;
            container.innerHTML += `<div class = 'gasto__descripcion' id = 'gasto__descripcion'>
            <p class = 'gasto'> <span class = 'gasto__span'> ${gasto} </span> </p>
            <p class = 'precio'>$ <span class = 'precio__span'> ${costo} </span> </p>
            </div`
            
            document.getElementById('presupuesto__span').textContent = ` ${presupuesto}`;
            document.getElementById('restante__span').textContent = ` ${restante}`;
        }
    }

    
}




//EventListeners
document.getElementById('form__prompt').addEventListener('submit', (e) => {
    //Varaibles
    const presupuestoUsuario = document.getElementById('presupuesto').value;    
    
    if ((presupuestoUsuario === null || presupuestoUsuario === '') && e.target.id === 'btn__aceptar' ) {
         location.reload(true) 
    }else {
        console.log(`Presupuesto agregado: ${presupuestoUsuario}`)
        let presupuesto = new Presupuesto(presupuestoUsuario);
        presupuesto.mostrarPresupuesto();
        presupuesto.mostrrRestante();
        document.getElementById('prompt').classList.add('prompt__eliminar');
        document.getElementById('form__prompt').reset();
        e.preventDefault();
    }
     
})

document.getElementById('btn__insertar').addEventListener('click', () => {
    document.getElementById('prompt').classList.add('prompt__eliminar');
   
})
    
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const presupuestoUsuario = document.getElementById('presupuesto__span').textContent;
    let costo = document.getElementById('costo').value;

    let restante = new Restante()
    restante.calcularRestante(costo);
    restante.colorearRestante(presupuestoUsuario);

    let storage = new LocalStorage()
    storage.save();
    storage.mostrarGastos(); 
    document.getElementById('form').reset();
})

document.getElementById('btn__eliminar').addEventListener('click', () => {
    let reiniciar = new Presupuesto();
    reiniciar.reiniciarValores();
    document.getElementById('restante').style.backgroundColor = 'rgb(170, 233, 170)';
    localStorage.removeItem('gastos');
    document.getElementById('prompt').classList.add('prompt__display');
    document.getElementById('prompt').classList.remove('prompt__eliminar');
    let storage = new LocalStorage()
    storage.mostrarGastos(); 
    
    
})

const presupuestoUsuario = parseFloat(document.getElementById('presupuesto__span').textContent);
let storage = new LocalStorage()
storage.mostrarGastos(); 