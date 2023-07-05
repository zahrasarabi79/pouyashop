async function downloadReport() {
  const { jsPDF } = window.jspdf;
  let reportContent = document.getElementById("reportContent").innerHTML;
  let doc = new jsPDF();
  doc.html(reportContent, {
    callback: function (pdf) {
      pdf.save("HivadReport.pdf");
    },
  });
}
