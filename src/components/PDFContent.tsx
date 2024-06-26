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
      doc.setFont("Roboto");

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
      doc.setFontSize(16);
      doc.text("Skills", 20, yPos, {
        align: "left",
        fillColor: [255, 105, 180],
      });
      yPos += 5;

      // Initialize variables for tag rendering
      let currentXPos = 20; // Starting X position for the first tag
      let currentYPos = yPos; // Starting Y position for the first tag
      const maxWidth = doc.internal.pageSize.width - 40; // Maximum width for tags

      // Render skills using Ant Design tags with custom styling
      userInfo.skills.forEach((skill: string) => {
        const tagWidth = doc.getStringUnitWidth(skill) * 4 + 10; // Adjust multiplier to fit the tag width
        const tagHeight = 8; // Height of the tag

        // Check if tag exceeds the maximum width
        if (currentXPos + tagWidth > maxWidth) {
          // Move to the next line
          currentXPos = 20; // Reset X position
          currentYPos += 15; // Increase Y position for the next line
        }

        // Render Tag component with custom styling
        doc.setFillColor("#808080"); // Background color of the tag (Grey)
        doc.setDrawColor("#000000"); // Border color of the tag (Black)
        doc.roundedRect(
          currentXPos,
          currentYPos,
          tagWidth,
          tagHeight,
          2,
          2,
          "FD"
        ); // Draw rounded rectangle for tag background with border
        doc.setTextColor(51, 51, 51); // Text color of the tag
        doc.setFontSize(12); // Font size of the tag text
        doc.text(skill, currentXPos + 5, currentYPos + 5); // Adjust the position of the text within the tag

        // Update current X position for the next tag
        currentXPos += tagWidth + 5; // Increase X position for the next tag with a margin
      });

      // Update Y position after rendering all tags
      yPos = currentYPos + 20;

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

      userInfo?.projects.forEach((project: any, index: number) => {
        // Check if there's enough space on the current page for the project details
        if (yPos + 50 > doc.internal.pageSize.height) {
          // If not, add a new page
          doc.addPage();
          // Reset yPos to top of the new page or desired starting position
          yPos = 20; // Adjust as needed
        }

        if (yPos === 20) {
          doc.setFontSize(18);
          doc.text("Project Details", 20, yPos);
          yPos += 20;
        }

        doc.setFontSize(12);
        doc.text(`Project Name: ${project.name}`, 20, yPos);
        yPos += 10;
        doc.text(`Role: ${project.role}`, 20, yPos);
        yPos += 10;
        doc.text(`Team Size: ${project.teamSize}`, 20, yPos);
        // Align "Project Overview" text properly
        const projectOverviewLines = doc.splitTextToSize(
          project.projectOverview,
          170
        );
        const overviewHeight = projectOverviewLines.length * 10;
        yPos += 10;
        doc.text("Project Overview:", 20, yPos);
        yPos += 10; // Add some space before the text
        projectOverviewLines.forEach((line: string) => {
          doc.text(line, 20, yPos);
          yPos += 5; // Move to the next line
        });
        yPos += 10; // Add some space after the text

        // Add additional space between projects, adjust as needed
        if (index < userInfo.projects.length - 1) {
          yPos += 20;
        }
      });

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
