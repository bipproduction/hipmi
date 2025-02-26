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

export const listAdminPage = [
  // Main Dashboard
  {
    id: 1,
    name: "Dashboard",
    path: RouterAdminDashboard.main_admin,
    icon: <IconHome />,
    child: [],
  },

  // Investasi
  {
    id: 2,
    name: "Investasi",
    path: "",
    icon: <IconMoneybag />,
    child: [
      {
        id: 21,
        name: "Dashboard",
        path: RouterAdminInvestasi.main,
      },
      {
        id: 22,
        name: "Table Publish",
        path: RouterAdminInvestasi.table_publish,
      },
      {
        id: 23,
        name: "Table Review",
        path: RouterAdminInvestasi.table_review,
      },
      {
        id: 24,
        name: "Table Reject",
        path: RouterAdminInvestasi.table_reject,
      },
    ],
  },

  //Donasi
  {
    id: 3,
    name: "Donasi",
    path: "",
    icon: <IconHeartHandshake />,
    child: [
      {
        id: 31,
        name: "Dashboard",
        path: RouterAdminDonasi.main,
      },
      {
        id: 32,
        name: "Table Publish",
        path: RouterAdminDonasi.table_publish,
      },
      {
        id: 33,
        name: "Table Review",
        path: RouterAdminDonasi.table_review,
      },
      {
        id: 34,
        name: "Table Reject",
        path: RouterAdminDonasi.table_reject,
      },
      {
        id: 35,
        name: "Table Kategori",
        path: RouterAdminDonasi.table_kategori,
      },
    ],
  },

  // Event
  {
    id: 4,
    name: "Event",
    path: "",
    icon: <IconPresentation />,
    child: [
      {
        id: 41,
        name: "Dashboard",
        path: RouterAdminEvent.main_event,
      },
      {
        id: 42,
        name: "Table Publish",
        path: RouterAdminEvent.table_publish,
      },
      {
        id: 43,
        name: "Table Review",
        path: RouterAdminEvent.table_review,
      },
      {
        id: 44,
        name: "Table Reject",
        path: RouterAdminEvent.table_reject,
      },
      {
        id: 45,
        name: "Tipe Acara",
        path: RouterAdminEvent.detail_tipe_acara,
      },
      {
        id: 6,
        name: "Riwayat",
        path: RouterAdminEvent.detail_riwayat,
      },
    ],
  },

  // Voting
  {
    id: 5,
    name: "Voting",
    path: "",
    icon: <IconPackageImport />,
    child: [
      {
        id: 51,
        name: "Dashboard",
        path: RouterAdminVote.main,
      },
      {
        id: 52,
        name: "Table Publish",
        path: RouterAdminVote.table_publish,
      },
      {
        id: 53,
        name: "Table Review",
        path: RouterAdminVote.table_review,
      },
      {
        id: 54,
        name: "Table Reject",
        path: RouterAdminVote.table_reject,
      },
      {
        id: 55,
        name: "Riwayat",
        path: RouterAdminVote.riwayat,
      },
    ],
  },

  // Job Vacancy
  {
    id: 6,
    name: "Job Vacancy",
    path: "",
    icon: <IconBriefcase />,
    child: [
      {
        id: 61,
        name: "Dashboard",
        path: RouterAdminJob.main,
      },
      {
        id: 62,
        name: "Table Publish",
        path: RouterAdminJob.publish,
      },
      {
        id: 63,
        name: "Table Review",
        path: RouterAdminJob.review,
      },
      {
        id: 64,
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
    id: 7,
    name: "Forum",
    path: "",
    icon: <IconMessages />,
    child: [
      {
        id: 71,
        name: "Dashboard",
        path: RouterAdminForum.main,
      },
      {
        id: 72,
        name: "Table Posting",
        path: RouterAdminForum.table_posting,
      },
      {
        id: 73,
        name: "Report Posting",
        path: RouterAdminForum.table_report_posting,
      },
      {
        id: 74,
        name: "Report Komentar",
        path: RouterAdminForum.table_report_komentar,
      },
    ],
  },

  // Project Collaboration
  {
    id: 8,
    name: "Project Collaboration",
    path: "",
    icon: <IconAffiliate />,
    child: [
      {
        id: 81,
        name: "Dashboard",
        path: RouterAdminColab.dashboard,
      },
      {
        id: 82,
        name: "Table Publish",
        path: RouterAdminColab.table_publish,
      },
      {
        id: 83,
        name: "Table Group",
        path: RouterAdminColab.table_group,
      },
      {
        id: 84,
        name: "Table Reject",
        path: RouterAdminColab.table_reject,
      },
    ],
  },

  {
    id: 9,
    name: "Maps",
    path: RouterAdminMap.main,
    icon: <IconMap2 />,
    child: [],
  },

  // App Information
  {
    id: 97,
    name: "App Information",
    path: RouterAdminAppInformation.main,
    icon: <IconDeviceMobile />,
    child: [],
  },

  // User Access
  {
    id: 98,
    name: "User Access",
    path: RouterAdminUserAccess.main,
    icon: <IconUserCog />,
    child: [],
  },

  // Developer
  {
    id: 99,
    name: "Developer",
    path: RouterAdminDeveloper.main,
    icon: <IconDashboard />,
    child: [],
  },
];
