// Importar jsPDF y jspdf-autotable desde el contexto global
const { jsPDF } = window.jspdf;

export async function generarPDF(formData, cotizacion, autoDealer) {
    // Verificar si jsPDF está disponible
    if (typeof jsPDF === 'undefined') {
        console.error('Error: jsPDF no está disponible');
        return null;
    }
    
    const doc = new jsPDF();

    try {
        // Generar nombre del archivo
        const now = new Date();
        const timestamp = now.getFullYear().toString().substr(-2) +
                          (now.getMonth() + 1).toString().padStart(2, '0') +
                          now.getDate().toString().padStart(2, '0') +
                          now.getHours().toString().padStart(2, '0') +
                          now.getMinutes().toString().padStart(2, '0');
        const placa = formData.placa.replace(/[^a-zA-Z0-9]/g, '');
        const cliente = formData.contratante.replace(/[./()\s]+$/, '').replace(/[./()]/g, '');
        const fileName = `Qualitas Corp ${timestamp} ${placa} ${cliente}.pdf`;

        // Crear tabla básica
        doc.setFontSize(18);
        doc.text('SLIP DE COTIZACIÓN - QUALITAS CORP', 20, 20);
        doc.setFontSize(12);
        doc.setLineWidth(0.1);
        
        let y = 40;
        const addRow = (label, value) => {
            doc.line(20, y, 190, y);
            doc.text(label, 25, y + 10);
            doc.text(value, 100, y + 10);
            y += 15;
        };

        addRow('Contratante:', formData.contratante);
        addRow('DNI/RUC:', formData.dni_ruc);
        addRow('Placa:', formData.placa);
        addRow('Marca:', formData.marca);
        addRow('Modelo:', formData.modelo);
        addRow('Año:', formData.ano);
        addRow('Suma Asegurada:', `${formData.sumaAsegurada.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        addRow('Prima Total:', `${cotizacion.primaTotal.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

        doc.line(20, y, 190, y);

        // Generar el PDF y devolver el blob
        return {
            blob: doc.output('blob'),
            fileName: fileName
        };
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        return null;
    }
}
