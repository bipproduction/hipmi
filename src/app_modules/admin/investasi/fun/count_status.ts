"use server";

import prisma from "@/lib/prisma";
import _ from "lodash";

/**
 * 
 * @param id 
 * 
 * @type number
 * @returns count of status investasi
 */
export default async function Admin_CountStatusInvestasi(id: number) {
    if (id === 1) {
      const count = await prisma.investasi.count({
        where: {
          MasterStatusInvestasi: {
            name: {
              equals: "Draft",
            },
          },
        },
      });
      return count;
    }

    if (id === 2) {
      const count = await prisma.investasi.count({
        where: {
          MasterStatusInvestasi: {
            name: {
              equals: "Review",
            },
          },
        },
      });
      return count;
    }

    if (id === 3) {
      const count = await prisma.investasi.count({
        where: {
          MasterStatusInvestasi: {
            name: {
              equals: "Publish",
            },
          },
        },
      });
      return count;
    }

    if (id === 4) {
      const count = await prisma.investasi.count({
        where: {
          MasterStatusInvestasi: {
            name: {
              equals: "Reject",
            },
          },
        },
      });
      return count;
    }
}
