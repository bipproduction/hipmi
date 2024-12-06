export interface IListPortofolio {
   id: string
   id_Portofolio: string
   profileId: string
   namaBisnis: string
}

export interface IDetailPortofolioBisnis {
   id_Portofolio: string
   namaBisnis: string
   alamatKantor: string
   tlpn: string
   deskripsi: string
   logoId: string
   bidangBisnis: string
   authorId: string
}

export interface IDetailPortofolioLokasi {
   mapId: string
   logoId: string
   namePin: string
   latitude: string
   longitude: string
   imageId: string
   pinId: string
}

export interface IDetailPortofolioSosmed {
   facebook: string
   twitter: string
   instagram: string
   tiktok: string
   youtube: string
}