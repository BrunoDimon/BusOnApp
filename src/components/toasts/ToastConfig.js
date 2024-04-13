import React from 'react';
import ToastAlert from './ToastAlert'; // Importe o componente ToastAlert aqui

const ToastConfig = ((tipo, titulo, descricao, onClose) => {
    return {
        placement: "top",
        render: ({ id }) => (
            <ToastAlert
                toastId={"toast-" + id}
                tipo={tipo}
                titulo={titulo}
                descricao={descricao}
                toastClose={() => onClose(id)}
            />
        )
    }
});

export default ToastConfig;