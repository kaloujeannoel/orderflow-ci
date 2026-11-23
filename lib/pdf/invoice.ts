import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceData {
  saleNumber: string;
  date: string;
  businessName: string;
  businessPhone?: string | null;
  businessCity?: string | null;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  paymentMethod: string;
}

export function generateInvoicePDF(data: InvoiceData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- En-tête vert ---
  doc.setFillColor(21, 128, 61); // Couleur brand-600 (#15803D)
  doc.rect(0, 0, pageWidth, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(data.businessName, 14, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Facture / Reçu", pageWidth - 14, 15, { align: "right" });

  // --- Infos commerce et client ---
  doc.setTextColor(71, 85, 105); // slate-600
  doc.setFontSize(9);
  let y = 45;
  
  const infoLines = [
    data.businessCity ? `Ville : ${data.businessCity}` : null,
    data.businessPhone ? `Tél : ${data.businessPhone}` : null,
  ].filter(Boolean) as string[];

  infoLines.forEach(line => {
    doc.text(line, 14, y);
    y += 5;
  });

  // Infos Facture (à droite)
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont("helvetica", "bold");
  doc.text(`N° ${data.saleNumber}`, pageWidth - 14, 45, { align: "right" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Date : ${data.date}`, pageWidth - 14, 52, { align: "right" });
  doc.text(`Client : ${data.customerName}`, pageWidth - 14, 59, { align: "right" });

  // --- Tableau des produits ---
  autoTable(doc, {
    startY: 75,
    head: [["Produit", "Qté", "Prix Unitaire", "Total"]],
    body: data.items.map(item => [
      item.name,
      item.quantity.toString(),
      `${item.price.toLocaleString("fr-CI")} FCFA`,
      `${(item.price * item.quantity).toLocaleString("fr-CI")} FCFA`,
    ]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [21, 128, 61], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      1: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "right" },
    },
  });

  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;

  // --- Total ---
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(21, 128, 61);
  doc.text("TOTAL :", pageWidth - 80, finalY);
  doc.text(`${data.total.toLocaleString("fr-CI")} FCFA`, pageWidth - 14, finalY, { align: "right" });

  // --- Pied de page ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Mode de paiement : ${data.paymentMethod}`, 14, doc.internal.pageSize.getHeight() - 15);
  doc.text(`Généré par OrderFlow CI le ${new Date().toLocaleString("fr-CI")}`, pageWidth - 14, doc.internal.pageSize.getHeight() - 15, { align: "right" });

  // --- Sauvegarde ---
  doc.save(`facture-${data.saleNumber}.pdf`);
}