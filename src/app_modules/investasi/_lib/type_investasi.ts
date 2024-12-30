export interface IDataInvestasi {
   id: string
   title: string
   targetDana: string
   hargaLembar: string
   totalLembar: string
   roi: string
   countDown: string
   catatan: string
   sisaLembar: string
   imageId: string
   masterPencarianInvestorId: string
   masterPeriodeDevidenId: string
   masterPembagianDevidenId: string
}

export interface IDataInvestasiBursa {
   id: string
   title: string
   imageId: string
   progress: string
   countDown: string
   targetDana: string
   pencarianInvestor: string
   updatedAt: Date
}

export interface IDataSahamSaya {
   id: string
   nominal: string
   lembarTerbeli: string
   statusInvoiceId: string
   createdAt: Date
   statusInvoice: string
   title: string
   progress: string
}