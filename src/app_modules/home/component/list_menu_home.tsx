import { RouterColab } from '@/lib/router_hipmi/router_colab';
import { RouterEvent } from '@/lib/router_hipmi/router_event';
import { RouterForum } from '@/lib/router_hipmi/router_forum';
import { RouterJob } from '@/lib/router_hipmi/router_job';
import { RouterMap } from '@/lib/router_hipmi/router_map';
import { RouterVote } from '@/lib/router_hipmi/router_vote';
import { IconAffiliate, IconBriefcase, IconHeartHandshake, IconMap2, IconMessages, IconPackageImport, IconPresentation, IconShoppingBag } from '@tabler/icons-react';


// yg ada di footer home
export const listMenuHomeFooter = [
  {
    id: 1,
    name: "Forum",
    icon: <IconMessages />,
    link: RouterForum.splash,
  },
  {
    id: 2,
    name: "Marketplace",
    icon: <IconShoppingBag />,
    link: "",
  },
  {
    id: 3,
    name: "Business Maps",
    icon: <IconMap2 />,
    link: RouterMap.splash,
  },
];


// yg ada di kotak2 home (body)
export const listMenuHomeBody = [
  {
    id: 1,
    name: "Event",
    icon: <IconPresentation size={50} />,
    link: RouterEvent.splash,
  },
  {
    id: 2,
    name: "Collaboration",
    icon: <IconAffiliate size={50} />,
    link: RouterColab.splash,
  },

  {
    id: 3,
    name: "Voting",
    icon: <IconPackageImport size={50} />,
    link: RouterVote.splash,
  },

  {
    id: 4,
    name: "Crowdfunding",
    icon: <IconHeartHandshake size={50} />,
    link: `/dev/crowd/splash`,
  },
];

export const menuHomeJob = {
  name: "Job Vacancy",
  icon: <IconBriefcase size={50} />,
  link: RouterJob.spalsh,
};