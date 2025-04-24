export interface MODEL_IMAGES {
  id: string;
  url: string;
  label: string
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MODEL_DEFAULT_MASTER_OLD {
  id: string,
  name: string,
  active: boolean,
}

export interface MODEL_NEW_DEFAULT_MASTER {
  id: string,
  name: string,
  active: boolean,
  createdAt: Date;
  updatedAt: Date;
}

export interface IDefaultMaster {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

