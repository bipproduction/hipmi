export const RouterProfile = {
  katalogOLD: "/dev/katalog/",
  "katalog": ({id}:{id: string}) => `/dev/katalog/${id}`,

  // create
  create: "/dev/profile/create",

  // edit
  edit: "/dev/profile/edit/",

  // api
  api_foto_profile: "/api/profile/foto/",
  api_background_profile: "/api/profile/background/",
  api_url_foto: "/api/profile/url_foto/",
  api_url_background: "/api/profile/url_background/",

  // upload
  update_foto_profile: "/dev/profile/upload/foto/",
  update_foto_background: "/dev/profile/upload/background/",
};

export const RouterPortofolio = {
  main_detail: "/dev/portofolio/main/",

  api_logo_porto: "/api/portofolio/logo/",
  create: "/dev/portofolio/create/",

  daftar_portofolio: "/dev/portofolio/daftar-portofolio/",

  //edit
  edit_data_bisnis: "/dev/portofolio/edit/data/",
  edit_logo_bisnis: "/dev/portofolio/edit/logo/",
  edit_medsos_bisnis: "/dev/portofolio/edit/medsos/",
};
