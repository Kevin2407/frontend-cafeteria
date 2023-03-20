import Swal from "sweetalert2";

const campoRequerido = (valor) => {
    if (valor.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Los valores son obligatorios!",
        });
        return false;
    } else {
        return true;
    }
};

const rangoValor = (valor) => {
    if (valor > 0 && valor < 50000) {
        return true;
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El precio no puede ser mayor a $50.000!",
        });
        return false;
    }
};

export { campoRequerido, rangoValor };
