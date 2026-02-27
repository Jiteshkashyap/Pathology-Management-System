import PDFDocument from "pdfkit";

export const generatePDFReport = (report) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });

    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer); //  return buffer
    });

    // --- YOUR SAME DESIGN (NO CHANGE) ---
    doc.fontSize(22).text("DIAGNOSTIC REPORT", { align: "center" });
    doc.moveDown();

    doc.text(`Patient: ${report.patientName}`);
    doc.text(`Doctor: ${report.doctor?.name || "N/A"}`);
    doc.moveDown();

    report.tests.forEach((t) => {
      doc.text(`${t.name} - ${t.result}`);
    });

    // Barcode (same as your logic)
    if (report.barcode) {
      const cleanBase64 = report.barcode.replace(/^data:image\/\w+;base64,/, "");
      doc.image(Buffer.from(cleanBase64, "base64"), {
        width: 150,
      });
    }

    doc.end();
  });
};