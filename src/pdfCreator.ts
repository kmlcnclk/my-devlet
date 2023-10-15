import html_to_pdf from 'html-pdf-node';
import jsPDF from 'jspdf';

export async function pdfCreator() {
  const pdf = new jsPDF();

  // Add your HTML content here
  const htmlContent = '<h1>Hello, PDF!</h1>';

  // Convert the HTML to PDF
  pdf.(htmlContent, 10, 10);

  // Get the PDF as a byte array (Uint8Array)
  const pdfBytes = pdf.output('uint8array');

  // Now, you can use pdfBytes as needed
  console.log(pdfBytes);
}
