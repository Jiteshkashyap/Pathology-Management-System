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

    // --- HEADER SECTION ---
    doc
      .fontSize(22)
      .fillColor("#2c3e50")
      .text("DIAGNOSTIC REPORT", { align: "center", underline: true });

    doc.moveDown(1.5);

    // --- PATIENT INFO BOX ---
    doc.rect(50, 100, 500, 80).stroke("#bdc3c7");

    doc.fontSize(12).fillColor("black");

    doc
      .font("Helvetica-Bold")
      .text("Patient Name: ", 60, 110, { continued: true })
      .font("Helvetica")
      .text(report.patientName);

    doc
      .font("Helvetica-Bold")
      .text("Age: ", 60, 130, { continued: true })
      .font("Helvetica")
      .text(report.patientAge || "N/A");

    doc
      .font("Helvetica-Bold")
      .text("Referred By: ", 60, 150, { continued: true })
      .font("Helvetica")
      .text(`Dr. ${report.doctor?.name || "Unknown"}`);

    doc.moveDown(4);

    // --- TABLE HEADER ---
    const tableTop = 210;

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#34495e");

    doc.text("Test Description", 60, tableTop);
    doc.text("Result", 250, tableTop);
    doc.text("Units", 320, tableTop);
    doc.text("Normal Range", 400, tableTop);
    doc.text("Status", 500, tableTop);

    doc
      .moveTo(50, tableTop + 15)
      .lineTo(550, tableTop + 15)
      .stroke("#bdc3c7");

    // --- TABLE ROWS ---
    let currentY = tableTop + 30;

    doc.font("Helvetica").fontSize(10).fillColor("black");

    report.tests.forEach((test) => {
      doc.text(test.name || "Test", 60, currentY);
      doc.text(test.result?.toString() || "-", 250, currentY);
      doc.text(test.unit || "", 320, currentY);
      doc.text(
        `${test.normalRange?.min ?? "-"}-${test.normalRange?.max ?? "-"}`,
        400,
        currentY
      );

      if (test.status !== "Normal") {
        doc
          .fillColor("#e74c3c")
          .font("Helvetica-Bold")
          .text(test.status || "-", 500, currentY)
          .fillColor("black")
          .font("Helvetica");
      } else {
        doc.text(test.status || "-", 500, currentY);
      }

      currentY += 20;
    });

    // --- FOOTER & BARCODE ---
    doc
      .moveTo(50, 700)
      .lineTo(550, 700)
      .stroke("#bdc3c7");

    if (report.barcode) {
      try {
        const cleanBase64 = report.barcode.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        doc.image(Buffer.from(cleanBase64, "base64"), 50, 715, {
          width: 150,
        });
      } catch (e) {
        console.error("Barcode error:", e);
      }
    }

    doc
      .fontSize(8)
      .fillColor("#7f8c8d")
      .text(
        "This is a computer-generated report and does not require a physical signature.",
        220,
        730,
        { align: "right" }
      );

    doc.end(); // ✅ MUST
  });
};