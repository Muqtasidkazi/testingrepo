import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PdfConvertor = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Fetch API data
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setApiData(data.products))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const convertDataToPDF = () => {
    const doc = new jsPDF();
    let currentY = 10;  // Initialize Y position

    if (!apiData.length) {
      return;
    }

    apiData.forEach((product, index) => {
      if (index > 0 && currentY > 260) { // Check if current Y position is close to page end
        doc.addPage();
        currentY = 10;  // Reset Y position for new page
      }

      // Add title
      doc.setFontSize(18);
      doc.text(product.title, 10, currentY);
      currentY += 10;

      // Add description
      doc.setFontSize(12);
      doc.text(product.description, 10, currentY);
      currentY += 10;
      
      doc.setFontSize(12);
      doc.text(product.category, 10, currentY);
      currentY += 10;
      
      doc.setFontSize(12);
      doc.text(`price ${product.price}` ,10, currentY);
      currentY += 10;
      
      // Add a table for product details
    //   autoTable(doc, {
    //     startY: currentY,
    //     margin: { top: 10 },
    //     head: [['Field', 'Value']],
    //     body: [
    //       ['Price', `$${product.price}`],
    //       ['Discount', `${product.discountPercentage}%`],
    //       ['Rating', product.rating],
    //       ['Stock', product.stock],
    //       ['Brand', product.brand],
    //       ['Category', product.category],
    //     ],
    //     didDrawPage: (data) => {
    //       currentY = data.cursor.y;  // Update current Y position
    //     },
    //   });

      currentY += 10; // Add some space after each product's details
    });

    // Save the PDF
    doc.save('products.pdf');
  };

  return (
    <div>
      <button onClick={convertDataToPDF}>Convert to PDF and Download</button>
    </div>
  );
};

export default PdfConvertor;
