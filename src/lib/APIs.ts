const APIs = {
  /**
   * 
   * @param fileId | file id from wibu storage , atau bisa disimpan di DB
   * @param size | file size 10 - 1000 , tergantung ukuran file dan kebutuhan saar di tampilkan
   * @type {string}
   */
  GET: ({ fileId, size }: { fileId: string; size?: string }) =>
    size
      ? `https://wibu-storage.wibudev.com/api/files/${fileId}-size-${size}`
      : `https://wibu-storage.wibudev.com/api/files/${fileId}`,

  /**
   * @type {string}
   * @returns alamat API dari wibu storage
   */
  GET_NO_PARAMS: "https://wibu-storage.wibudev.com/api/files/"
};

export default APIs;
