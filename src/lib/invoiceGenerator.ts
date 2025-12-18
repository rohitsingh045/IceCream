import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface Order {
  _id: string;
  orderNumber?: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
}

export const generateInvoicePDF = (order: Order) => {
  const doc = new jsPDF();
  
  const orderId = order.orderNumber || order._id.slice(-8).toUpperCase();
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Colors
  const primaryColor: [number, number, number] = [236, 72, 153]; // Pink
  const secondaryColor: [number, number, number] = [168, 85, 247]; // Purple
  const darkColor: [number, number, number] = [31, 41, 55]; // Dark gray

  // Header Background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 45, "F");
  
  // Gradient effect (second rectangle)
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(140, 0, 70, 45, "F");

  // Company Name - Use plain text without emoji
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("NAMASTE BHARAT", 15, 20);
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Premium Ice Cream", 15, 30);
  
  doc.setFontSize(10);
  doc.text("Delicious Frozen Treats", 15, 38);

  // Invoice Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 160, 25, { align: "center" });

  // Reset text color
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);

  // Invoice Details Box
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(15, 55, 85, 35, 3, 3, "F");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Details", 20, 63);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Invoice No: #${orderId}`, 20, 72);
  doc.text(`Date: ${orderDate}`, 20, 80);
  doc.text(`Status: ${order.orderStatus.toUpperCase()}`, 20, 88);

  // Billing Address Box
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(110, 55, 85, 35, 3, 3, "F");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Bill To", 115, 63);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(order.shippingAddress.fullName, 115, 72);
  doc.text(order.shippingAddress.address.substring(0, 35), 115, 80);
  doc.text(
    `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}`,
    115,
    88
  );

  // Items Table
  const tableData = order.items.map((item, index) => [
    index + 1,
    item.name,
    item.quantity,
    `Rs. ${item.price.toFixed(2)}`,
    `Rs. ${(item.quantity * item.price).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 100,
    head: [["#", "Item", "Qty", "Price", "Total"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [236, 72, 153],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 80, halign: "left" },
      2: { cellWidth: 20 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 },
    },
    margin: { left: 15, right: 15 },
  });

  // Get the Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Summary Box
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(120, finalY, 75, 40, 3, 3, "F");

  doc.setFontSize(10);
  doc.text("Subtotal:", 125, finalY + 12);
  doc.text(`Rs. ${order.totalAmount.toFixed(2)}`, 185, finalY + 12, { align: "right" });

  doc.text("Delivery:", 125, finalY + 22);
  doc.text("FREE", 185, finalY + 22, { align: "right" });

  doc.setDrawColor(200, 200, 200);
  doc.line(125, finalY + 27, 190, finalY + 27);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Total:", 125, finalY + 36);
  doc.text(`Rs. ${order.totalAmount.toFixed(2)}`, 185, finalY + 36, { align: "right" });

  // Payment Method
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Payment Method: ${order.paymentMethod.toUpperCase()}`, 15, finalY + 20);

  // Footer
  const footerY = 270;
  doc.setDrawColor(236, 72, 153);
  doc.setLineWidth(0.5);
  doc.line(15, footerY, 195, footerY);

  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text("Thank you for ordering from Namaste Bharat Ice Cream!", 105, footerY + 8, {
    align: "center",
  });
  doc.text("Phone: +91 9931584900 | Address: Konhwa More, Gopalganj, Bihar 841428", 105, footerY + 15, {
    align: "center",
  });

  // Save the PDF
  doc.save(`Invoice_${orderId}.pdf`);
};

export const generateOrdersExcel = (orders: Order[], filename: string = "orders") => {
  // Create CSV content (Excel compatible)
  const headers = [
    "Order ID",
    "Date",
    "Customer Name",
    "Phone",
    "Address",
    "City",
    "State",
    "Pincode",
    "Items",
    "Total Amount",
    "Payment Method",
    "Status",
  ];

  const rows = orders.map((order) => [
    order.orderNumber || order._id.slice(-8),
    new Date(order.createdAt).toLocaleDateString("en-IN"),
    order.shippingAddress.fullName,
    order.shippingAddress.phone,
    `"${order.shippingAddress.address.replace(/"/g, '""')}"`,
    order.shippingAddress.city,
    order.shippingAddress.state,
    order.shippingAddress.pincode,
    `"${order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}"`,
    order.totalAmount.toFixed(2),
    order.paymentMethod.toUpperCase(),
    order.orderStatus.toUpperCase(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create and download file
  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
};
