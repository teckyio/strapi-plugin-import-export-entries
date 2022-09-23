export const useDownloadFile = () => {
  const downloadFile = (content, filename, contentType) => {
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.click();
  };

  const withTimestamp = (fileName) => {
    const ts = new Date();

    const refinedDate = `${ts.getFullYear()}${('0' + (ts.getMonth() + 1)).slice(-2)}${ts.getDate()}-${ts.getHours()}-${ts.getMinutes()}`
    const name = fileName.split('.').slice(0, -1).join('.').concat(`_${refinedDate}`);
    const extension = fileName.split('.').slice(-1);
    return [name, extension].join('.');
  };

  return {
    downloadFile,
    withTimestamp,
  };
};
