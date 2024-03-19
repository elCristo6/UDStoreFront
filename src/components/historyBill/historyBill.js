import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getBills } from '../../service/newBillService';
import './historyBill.css';

const HistoryBill = () => {
    const [bills, setBills] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Added to handle the loading state
    useEffect(() => {
      const fetchBills = async () => {
        try {
          setIsLoading(true); // Iniciar la carga
          let billsData = await getBills(); // Suponiendo que esto devuelve directamente el array de facturas
          // Ordenar las facturas por fecha de creación de forma descendente
          billsData = billsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setBills(billsData);
        } catch (error) {
          console.error('Error fetching bills:', error);
        } finally {
          setIsLoading(false); // Finalizar la carga
        }
      };
    
      fetchBills();
    }, []);
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="history-bill-container">
        <h2 className="history-bill-title">Invoice History</h2>
        <Table dark className="history-bill-table">
          <thead>
            <tr>
              <th>Factura NO.</th>
              <th>Cliente</th>
              <th>MedioPago</th>
              <th>PagaCon:</th>
              <th>Cambio</th>
              <th>TotalFactura</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill._id}>
                <td>{bill.consecutivo}</td>
                <td>{bill.user}</td>
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
    );
};

export default HistoryBill;
