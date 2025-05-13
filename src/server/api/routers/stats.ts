import { errorFilter } from "@/server/filters";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { StatsService } from "@/server/features/stats";

export const statsRouter = createTRPCRouter({
  getAllStats: publicProcedure.query(async () => {
    try {
      const stats = await StatsService.getAllStats();
      return stats;
    } catch (error) {
      return errorFilter(error);
    }
  }),
});
