import html2canvas from "html2canvas";

export const downloadChartAsImage = (
  chartRef: React.RefObject<HTMLDivElement> | null,
  filename: string
) => {
  if (chartRef) {
    html2canvas(chartRef.current).then((canvas) => {
      const imageUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = filename;
      link.click();
    });
  }
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
