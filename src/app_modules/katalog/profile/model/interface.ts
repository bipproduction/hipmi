export interface ModelUser{
    id: string;
    username: string;
    nomor: string;
    active: true;
    createdAt: string;
    updatedAt:string;
    masterUserRoleId: string;

}

export interface ModelProfile {
  id: string;
  name: string;
  email: string;
  alamat: string;
  jenisKelamin: string;
  active: boolean;
  updatedAt: string;
  Images: string;
  User: ModelUser
}
