import { RouterAdminColab } from "@/lib/router_admin/router_admin_colab";
import { RouterAdminDeveloper } from "@/lib/router_admin/router_admin_developer";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import { RouterAdminEvent } from "@/lib/router_admin/router_admin_event";
import { RouterAdminForum } from "@/lib/router_admin/router_admin_forum";
import { RouterAdminInvestasi } from "@/lib/router_admin/router_admin_investasi";
import { RouterAdminJob } from "@/lib/router_admin/router_admin_job";
import { RouterAdminMap } from "@/lib/router_admin/router_admin_map";
import { RouterAdminVote } from "@/lib/router_admin/router_admin_vote";
import { RouterAdminUserAccess } from "@/lib/router_admin/router_admn_user_acces";
import { RouterAdminAppInformation } from "@/lib/router_admin/router_app_information";
import { RouterAdminDashboard } from "@/lib/router_hipmi/router_admin";
import {
  IconAffiliate,
  IconBriefcase,
  IconDashboard,
  IconDeviceMobile,
  IconHeartHandshake,
  IconHome,
  IconMap2,
  IconMessages,
  IconMoneybag,
  IconPackageImport,
  IconPresentation,
  IconUserCog,
} from "@tabler/icons-react";

export const newListAdminPage = [
  // Main Dashboard
  {
    id: "Main",
    name: "Dashboard",
    path: RouterAdminDashboard.main_admin,
    icon: <IconHome />,
    child: [],
  },

  // Investasi
  {
    id: "Investasi",
    name: "Investasi",
    path: "",
    icon: <IconMoneybag />,
    child: [
      {
        id: "Investasi_1",
        name: "Dashboard",
        path: RouterAdminInvestasi.main,
      },
      {
        id: "Investasi_2",
        name: "Table Publish",
        path: RouterAdminInvestasi.table_publish,
      },
      {
        id: "Investasi_3",
        name: "Table Review",
        path: RouterAdminInvestasi.table_review,
      },
      {
        id: "Investasi_4",
        name: "Table Reject",
        path: RouterAdminInvestasi.table_reject,
      },
    ],
  },

  //Donasi
  {
    id: "Donasi",
    name: "Donasi",
    path: "",
    icon: <IconHeartHandshake />,
    child: [
      {
        id: "Donasi_1",
        name: "Dashboard",
        path: RouterAdminDonasi.main,
      },
      {
        id: "Donasi_2",
        name: "Table Publish",
        path: RouterAdminDonasi.table_publish,
      },
      {
        id: "Donasi_3",
        name: "Table Review",
        path: RouterAdminDonasi.table_review,
      },
      {
        id: "Donasi_4",
        name: "Table Reject",
        path: RouterAdminDonasi.table_reject,
      },
      {
        id: "Donasi_5",
        name: "Table Kategori",
        path: RouterAdminDonasi.table_kategori,
      },
    ],
  },

  // Event
  {
    id: "Event",
    name: "Event",
    path: "",
    icon: <IconPresentation />,
    child: [
      {
        id: "Event_1",
        name: "Dashboard",
        path: RouterAdminEvent.main_event,
      },
      {
        id: "Event_2",
        name: "Table Publish",
        path: RouterAdminEvent.table_publish,
      },
      {
        id: "Event_3",
        name: "Table Review",
        path: RouterAdminEvent.table_review,
      },
      {
        id: "Event_4",
        name: "Table Reject",
        path: RouterAdminEvent.table_reject,
      },
      {
        id: "Event_5",
        name: "Tipe Acara",
        path: RouterAdminEvent.detail_tipe_acara,
      },
      {
        id: "Event_6",
        name: "Riwayat",
        path: RouterAdminEvent.detail_riwayat,
      },
    ],
  },

  // Voting
  {
    id: "Voting",
    name: "Voting",
    path: "",
    icon: <IconPackageImport />,
    child: [
      {
        id: "Voting_1",
        name: "Dashboard",
        path: RouterAdminVote.main,
      },
      {
        id: "Voting_2",
        name: "Table Publish",
        path: RouterAdminVote.table_publish,
      },
      {
        id: "Voting_3",
        name: "Table Review",
        path: RouterAdminVote.table_review,
      },
      {
        id: "Voting_4",
        name: "Table Reject",
        path: RouterAdminVote.table_reject,
      },
      {
        id: "Voting_5",
        name: "Riwayat",
        path: RouterAdminVote.riwayat,
      },
    ],
  },

  // Job Vacancy
  {
    id: "Job",
    name: "Job Vacancy",
    path: "",
    icon: <IconBriefcase />,
    child: [
      {
        id: "Job_1",
        name: "Dashboard",
        path: RouterAdminJob.main,
      },
      {
        id: "Job_2",
        name: "Table Publish",
        path: RouterAdminJob.publish,
      },
      {
        id: "Job_3",
        name: "Table Review",
        path: RouterAdminJob.review,
      },
      {
        id: "Job_4",
        name: "Table Reject",
        path: RouterAdminJob.reject,
      },
      // {
      //   id: 65,
      //   name: "Arsip",
      //   path: RouterAdminJob.arsip,
      // },
    ],
  },

  // Forum
  {
    id: "Forum",
    name: "Forum",
    path: "",
    icon: <IconMessages />,
    child: [
      {
        id: "Forum_1",
        name: "Dashboard",
        path: RouterAdminForum.main,
      },
      {
        id: "Forum_2",
        name: "Table Posting",
        path: RouterAdminForum.table_posting,
      },
      {
        id: "Forum_3",
        name: "Report Posting",
        path: RouterAdminForum.table_report_posting,
      },
      {
        id: "Forum_4",
        name: "Report Komentar",
        path: RouterAdminForum.table_report_komentar,
      },
    ],
  },

  // Project Collaboration
  {
    id: "Collaboration",
    name: "Collaboration",
    path: "",
    icon: <IconAffiliate />,
    child: [
      {
        id: "Collaboration_1",
        name: "Dashboard",
        path: RouterAdminColab.dashboard,
      },
      {
        id: "Collaboration_2",
        name: "Table Publish",
        path: RouterAdminColab.table_publish,
      },
      {
        id: "Collaboration_3",
        name: "Table Group",
        path: RouterAdminColab.table_group,
      },
      {
        id: "Collaboration_4",
        name: "Table Reject",
        path: RouterAdminColab.table_reject,
      },
    ],
  },

  // Maps
  {
    id: "Maps",
    name: "Maps",
    path: RouterAdminMap.main,
    icon: <IconMap2 />,
    child: [],
  },

  // App Information
  {
    id: "App Information",
    name: "App Information",
    path: RouterAdminAppInformation.infoBank,
    icon: <IconDeviceMobile />,
    child: [],
  },

  // User Access
  {
    id: "User Access",
    name: "User Access",
    path: RouterAdminUserAccess.main,
    icon: <IconUserCog />,
    child: [],
  },

  // Developer | Super Admin
  {
    id: "Super Admin",
    name: "Super Admin",
    path: RouterAdminDeveloper.main,
    icon: <IconDashboard />,
    child: [],
  },
];
