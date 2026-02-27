import PDFDocument from "pdfkit";

export const generatePDFReport = (report) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });

    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      resolve(pdfBuffer);
    });

    doc.on("error", reject);

    // --- CONTENT ---
    doc.fontSize(20).text("Diagnostic Report", { align: "center" });
    doc.moveDown();

    doc.text(`Patient: ${report.patientName}`);
    doc.text(`Doctor: ${report.doctor?.name || "N/A"}`);
    doc.moveDown();

    report.tests.forEach((t) => {
      doc.text(`${t.name} - ${t.result}`);
    });

    if (report.barcode) {
      const cleanBase64 = report.barcode.replace(/^data:image\/\w+;base64,/, "");
      doc.image(Buffer.from(cleanBase64, "base64"), {
        width: 150,
      });
    }

    doc.end(); // ✅ VERY IMPORTANT
  });
};