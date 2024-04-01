import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getBills } from '../../service/newBillService';
import './historyBill.css';

const HistoryBill = () => {
    const [bills, setBills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                setIsLoading(true);
                const billsData = await getBills();
                const sortedBills = billsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBills(sortedBills);
                const total = billsData.reduce((accumulator, currentBill) => accumulator + currentBill.totalAmount, 0);
                setTotalAmount(total);
            } catch (error) {
                console.error('Error fetching bills:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBills();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const getType = (bill) => {
        if (bill.products.length > 0) return 'Producto';
        if (bill.servicio.length > 0) return 'Servicio';
        if (bill.impresiones.length > 0) return 'Impresión';
        return 'Otro';
    };

    return (
        <div className="history-bill-container">
            <h2 className="history-bill-title">Historial de Facturas</h2>
            <div className="history-bill-table-container">
                <Table dark className="history-bill-table">
                    <thead>
                        <tr>
                            <th>Factura No.</th>
                            <th>Tipo</th> {/* Nueva columna para el tipo */}
                            <th>Detalles</th>
                            <th>Medio de Pago</th>
                            <th>Pago con</th>
                            <th>Cambio</th>
                            <th>Total Factura</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(bill => (
                            <tr key={bill._id}>
                                <td>{bill.consecutivo}</td>

                                <td>{getType(bill)}</td> {/* Muestra el tipo de ítem */}
                                <td className="detalle">
                                    {bill.products.map((product, index) => (
                                        <div key={index}>{product.product.name}</div>
                                    ))}
                                    {bill.servicio.map((serv, index) => (
                                        <div key={index}>{serv.nombre}</div>
                                    ))}
                                    {bill.impresiones.map((imp, index) => (
                                        <div key={index}>{imp.descripcionImpresion}</div>
                                    ))}
                                </td>
                                <td>{bill.medioPago}</td>
                                <td>{bill.pagaCon}</td>
                                <td>{bill.cambio}</td>
                                <td>${bill.totalAmount}</td>
                                <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="history-bill-total">Total de todas las facturas: ${totalAmount}</div>
        </div>
    );
};

export default HistoryBill;
