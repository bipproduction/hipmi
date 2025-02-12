export const RouterJob = {
  //api
  api_gambar: "/api/job/gambar/",

  //spalsh
  spalsh: "/dev/job/splash",

  // main
  beranda: "/dev/job/main/beranda",
  /**
   * 
   * @param statusId | 1 - 4 | 1: Publish, 2: Review, 3: Draft, 4: Reject 
   * @returns 
   */
  status: ({ id }: { id?: string }) => `/dev/job/main/status/${id}`,
  arsip: "/dev/job/main/arsip",

  // create & edit
  create: "/dev/job/create",
  edit: "/dev/job/edit/",

  // detail
  main_detail: "/dev/job/detail/main/",
  detail_publish: "/dev/job/detail/publish/",
  detail_review: "/dev/job/detail/review/",
  detail_draft: "/dev/job/detail/draft/",
  detail_reject: "/dev/job/detail/reject/",
  detail_arsip: "/dev/job/detail/arsip/",

  // non user
  non_user_view: "/dev/job/non_user_view/",
  "job_vacancy_non_user": ({ id }: { id: string }) => `/job-vacancy/${id}`,
};
