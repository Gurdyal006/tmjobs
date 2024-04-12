import React from "react";
import { Button, Tag } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";

const PDFContent = ({ userInfo }: any) => {
  const handlePdfDownload = () => {
    if (userInfo) {
      const doc: any = new jsPDF();
      let yPos = 20;

      // Add logo
      const logoUrl =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaOybsFg2W_2vInncG_ZT1n_U7A6tYUjT_Ec5ImK8JdsPNevcnDX_9nC1Gpxmhrznq00I&usqp=CAU";
      doc.addImage(logoUrl, "PNG", 160, 10, 30, 30);

      // Title: Employee Information
      doc.setFontSize(18);
      const titleWidth =
        (doc.getStringUnitWidth("Employee Information") *
          doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
      doc.text("Employee Information", titleX, yPos);

      // Add user information
      yPos += 20;
      doc.setFontSize(12);
      doc.text(`Name: ${userInfo.name}`, 20, yPos);
      yPos += 10;
      doc.text(`Email: ${userInfo.email}`, 20, yPos);
      yPos += 10;
      doc.text(`Phone: ${userInfo.phone}`, 20, yPos);
      // Add career objectives label
      yPos += 10;
      doc.setFontSize(12);
      // doc.text("Career Objectives", 20, yPos, {
      //   align: "left",
      //   fillColor: "#35374b",
      // });
      // yPos += 5;
      doc.text("Career Objectives:", 20, yPos);
      // Word wrap for career objective
      const careerObjectiveLines = doc.splitTextToSize(
        userInfo.carrierObjective,
        170
      );
      yPos += 10;
      doc.text(careerObjectiveLines, 20, yPos);

      yPos += careerObjectiveLines.length * 10; // Adjust spacing based on font size
      yPos += 5;
      // Add skills section
      // doc.setFontSize(16);
      // doc.text("Skills", 20, yPos, {
      //   align: "left",
      //   fillColor: [255, 105, 180],
      // });
      // yPos += 5;
      // yPos = addTable(doc, yPos, userInfo?.skills, ["technology", "rating"]);

      // Add education section
      doc.setFontSize(16);
      doc.text("Education", 20, yPos, {
        align: "left",
        fillColor: "#35374b",
      });
      yPos += 5;
      yPos = addTable(doc, yPos, userInfo.education, [
        "qualification",
        "institution",
        "percentage",
      ]);

      // Add experience section if applicable
      if (userInfo.userType === "employee") {
        doc.setFontSize(16);
        doc.text("Experience", 20, yPos, {
          align: "left",
          fillColor: "#35374b",
        });
        yPos += 5;
        yPos = addTable(doc, yPos, userInfo.experience, [
          "company",
          "role",
          "period",
        ]);
      }

      // const formatDate = (date: any) => {
      //   const options: any = { day: "2-digit", month: "long", year: "numeric" };
      //   return new Date(date).toLocaleDateString("en-GB", options);
      // };
      // const currentDate = formatDate(new Date());

      // const currentDate = new Date().toISOString().split("T")[0];

      const currentDate = moment().format("DD MMMM YYYY");
      // Save the PDF with name and current date
      doc.save(`${userInfo.name}_${currentDate}.pdf`);
    }
  };

  const addTable = (doc: any, yPos: any, data: any, columns: any) => {
    // for Table Header caps letter and extra text add
    const capitalizedColumns = columns.map((col: any) =>
      col === "rating"
        ? `Ratings out of 10`
        : col.replace(/\b\w/g, (char: string) => char.toUpperCase())
    );

    const tableData = data?.map((item: any) =>
      columns?.map((col: any) => item[col])
    );

    doc.autoTable({
      startY: yPos,
      head: [capitalizedColumns],
      body: tableData,
      // theme: "striped",
      // styles: { cellPadding: 3, fontSize: 12 },
      // headStyles: { fillColor: "#35374b" },
      // tableWidth: "auto",
      theme: "striped", // You can change this to any predefined theme, or remove it for custom styling
      styles: {
        // Custom styles for the table
        cellPadding: 3,
        fontSize: 12,
        // Add more custom styles here as needed
      },
      headStyles: {
        // Custom styles for the table header
        fillColor: "#000000", // Change the header background color
        textColor: "#ffffff", // Change the header text color
        fontStyle: "bold", // Make the header text bold
        // Add more custom styles here as needed
      },
      tableWidth: "auto",
    });
    return doc.autoTable.previous.finalY + 10;
  };

  return (
    <Button
      icon={<DownloadOutlined />}
      type="primary"
      onClick={handlePdfDownload}
    >
      PDF Download
    </Button>
  );
};

export default PDFContent;
