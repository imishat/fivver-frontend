
const ImageDownloader = ({ images }) => {
    function downloadImages(imageArray) {
        imageArray.forEach((img, index) => {
          fetch(`${process.env.NEXT_PUBLIC_DOWNLOAD}/${img?.fileId}`)
            .then(response => response.blob())
            .then(blob => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              // Use the image ID or index for the download name
              a.download = `${img?.originalFileName}`;
              
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            });
        });
      }
      
  return (
    <button onClick={() => downloadImages(images)}>Download All Files</button>
  );
}

export default ImageDownloader;
