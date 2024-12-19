export interface IDataAllDonasi {
   id: string
   imageId: string
   title: string
   publishTime: Date
   progres: string
   terkumpul: string
   target: string
   nameDonasiDurasi: string
}

export interface IDataAllDonasiSaya {
   id: string
   nominal: string
   donasiMaster_StatusInvoiceId: string
   nameStatusInvoice: string
   donasiId: string
   title: string
   publishTime: Date
   progres: string
   imageId: string
   durasiDonasi: string
}